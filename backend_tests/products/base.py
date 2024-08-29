#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/product/create"

response = requests.post(endpoint, json={"title": "Iphone 14", "price": 1000 })

# print(response.text)
# print(response.status_code)
print(response.json())
