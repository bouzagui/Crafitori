from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from .models import Order, OrderItem
from products.models import Product
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
import requests
from decouple import config
from decimal import Decimal
from django.conf import settings


PAYPAL_MODE = getattr(settings, 'PAYPAL_MODE', 'sandbox')
PAYPAL_CLIENT_ID = config('PAYPAL_CLIENT_ID')
PAYPAL_SECRET = config('PAYPAL_SECRET')
PAYPAL_API_BASE_URL = 'https://api-m.paypal.com' if PAYPAL_MODE == 'live' else 'https://api-m.sandbox.paypal.com'
MAD_TO_USD_EXCHANGE_RATE = Decimal('0.10')


def home(request):
    return render(request, 'home.html')

def test_cart(request):
    return render(request, 'test_cart.html')


def get_paypal_access_token():
    """
    Function to obtain the PayPal access token
    """
    response = requests.post(f'{PAYPAL_API_BASE_URL}/v1/oauth2/token',
                             headers={
                                 'Accept': 'application/json',
                                 'Accept-Language': 'en_US',
                             },
                             auth=(PAYPAL_CLIENT_ID, PAYPAL_SECRET),
                             data={
                                 'grant_type': 'client_credentials'
                             })

    if response.status_code == 200:
        access_token = response.json()['access_token']
        return access_token
    else:
        raise Exception("Could not obtain access token")


def create_paypal_order(request):
    # Get the order_id from the request (sent from frontend)
    order_id = request.GET.get('order_id')  # Or use request.data.get() if sending a POST request

    try:
        # Retrieve the order from the database using the order_id
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return JsonResponse({'error': 'Order not found.'}, status=404)

    # Obtain Access Token from PayPal
    access_token = get_paypal_access_token()

    #This line converts the MAD to USD
    print(f"Product price: {order.total_price}")
    order_total_in_usd = round(order.total_price * MAD_TO_USD_EXCHANGE_RATE, 2)
    print(f"Price to be paid in USD: {order_total_in_usd}")

    # Create PayPal order with total price from the Order model
    response = requests.post(f'{PAYPAL_API_BASE_URL}/v2/checkout/orders',
                             headers={
                                 'Content-Type': 'application/json',
                                 'Authorization': f'Bearer {access_token}'
                             },
                             json={
                                 'intent': 'CAPTURE',
                                 'purchase_units': [{
                                     'amount': {
                                         'currency_code': 'USD',
                                         'value': str(order_total_in_usd) # Send the actual total price from the order
                                     }
                                 }]
                             })

    if response.status_code in (200, 201):
        # Return the PayPal order ID to the frontend
        paypal_order_id = response.json().get('id')
        return JsonResponse({'paypal_order_id': paypal_order_id})
    else:
        return JsonResponse({'error': 'Failed to create PayPal order'}, status=response.status_code)


class capture_paypal_order(APIView):
    def post(self, request, *args, **kwargs):
        # Capture the order using PayPal API
        orderData = request.data.get('orderData')
        paypal_order_id = orderData.get('paypal_order_id')
        order_id = orderData.get('order_id')

        capture_url = f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{paypal_order_id}/capture"

        # Obtain the access token first, same way as before
        access_token = get_paypal_access_token()

        if not access_token:
            return JsonResponse({'error': 'Unable to obtain access token'}, status=500)

        # using the access token to capture the order
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
        }
        response = requests.post(capture_url, headers=headers)
        try:
            response_data = response.json()
        except ValueError:  # This will catch the JSONDecodeError
            response_data = response.text


        # Check if the capture was successful
        if response.status_code in (200, 201):
            data = response.json()
            if data['status'] == 'COMPLETED':
                # Mark the order as paid in database
                print("DONE")
                order = Order.objects.get(id=order_id)
                order.is_paid = True
                order.save()
                #send email to the seller ( optional )
                return JsonResponse({"status": "success", "details": data})
            else:
                return JsonResponse({"status": "error", "message": "Payment not completed", "details": data})
        else:
            return JsonResponse({"status": "error", "message": "Failed to capture payment", "response": response_data})

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        cart = request.data.get('cart')  # Cart data sent from frontend

        if not cart or len(cart) == 0:
            return Response({'error': 'Cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

        total_price = 0
        order = Order.objects.create(user=user, total_price=total_price, is_paid=False)

        # Loop through cart items to create order items
        for item in cart:
            product_id = item.get('product_id')
            quantity = item.get('quantity', 1)

            # Fetch product
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response({'error': f"Product with id {product_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)

            # Calculate total price
            item_price = product.price * quantity
            total_price += item_price

            # Create order item
            OrderItem.objects.create(order=order, product=product, quantity=quantity, price=item_price)

        # Update total price and save the order
        order.total_price = total_price
        order.save()

        # Return the created order ID to the frontend
        return Response({'message': 'Order created successfully', 'order_id': order.id}, status=status.HTTP_201_CREATED)
