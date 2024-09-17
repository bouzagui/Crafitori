from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from .models import Order, OrderItem
from products.models import Product
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
import requests
import os

PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID')
PAYPAL_SECRET = os.getenv('PAYPAL_SECRET')
PAYPAL_API_BASE_URL = 'https://api-m.sandbox.paypal.com'

def home(request):
    return render(request, 'home.html')



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
    order_id = request.GET.get('order_id')  # Or use request.data.get() if smox is sending a POST request

    try:
        # Retrieve the order from the database using the order_id
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return JsonResponse({'error': 'Order not found.'}, status=404)

    # Step 1: Obtain Access Token from PayPal
    response = requests.post(f'{PAYPAL_API_BASE_URL}/v1/oauth2/token',
                             headers={
                                 'Accept': 'application/json',
                                 'Accept-Language': 'en_US',
                             },
                             auth=(PAYPAL_CLIENT_ID, PAYPAL_SECRET),
                             data={
                                 'grant_type': 'client_credentials'
                             })

    access_token = response.json().get('access_token')

    if not access_token:
        return JsonResponse({'error': 'Unable to obtain access token'}, status=500)

    # Step 2: Create PayPal order with total price from the Order model
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
                                         'value': str(order.total_price)  # Send the actual total price from the order
                                     }
                                 }]
                             })

    if response.status_code in (200, 201):
        # Return the PayPal order ID to the frontend
        paypal_order_id = response.json().get('id')
        return JsonResponse({'paypal_order_id': paypal_order_id})
    else:
        return JsonResponse({'error': 'Failed to create PayPal order'}, status=response.status_code)


def capture_paypal_order(request, order_id):
    # Capture the order using PayPal API
    access_token = get_paypal_access_token()

    capture_url = f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{order_id}/capture"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }

    response = requests.post(capture_url, headers=headers)

    # Check if the capture was successful
    if response.status_code == 201 or response.status_code == 200:
        data = response.json()
        if data['status'] == 'COMPLETED':
            # Payment has been successfully captured
            print("DONE")
            return JsonResponse({"status": "success", "details": data})
        else:
            # Payment failed or incomplete
            print("FAILED")
            return JsonResponse({"status": "error", "message": "Payment not completed", "details": data})
    else:
        print("FAILED TO CAPTURE PAYMENT")
        return JsonResponse({"status": "error", "message": "Failed to capture payment", "response": response.json()})
