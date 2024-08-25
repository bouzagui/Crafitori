#!/usr/bin/python3

import requests

product_id = input("Product ID: ")

try:
    product_id = int(product_id)
except:
    product_id = None
    print("Not a valid ID")

if product_id:
    endpoint = f"http://localhost:8000/api/users/{product_id}/delete/"
    data = {"title": "Hello there, im changed", "price": 200 }
    response = requests.delete(endpoint, json=data)
    print(response.status_code, response.status_code==204)
