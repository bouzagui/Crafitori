#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/products/8/update/"
data = {"title": "Hello there, im changed", "price": 200 }
response = requests.put(endpoint, json=data)
print(response.json())
