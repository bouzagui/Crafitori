#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/products/"

response = requests.post(endpoint, json={"title": "Iphone 21", "price": 2000 })
print(response.json())
