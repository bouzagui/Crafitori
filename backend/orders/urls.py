from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('test_cart/', views.test_cart, name='test_cart'),
    path('', views.CheckoutView.as_view(), name="checkout"),
    path('create-paypal-order/', views.create_paypal_order, name='create_paypal_order'),
    path('capture-paypal-order/', views.capture_paypal_order.as_view(), name='capture_paypal_order'),
]
