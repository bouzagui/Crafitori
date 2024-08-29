#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/products/"
data = {"title": "Webcam", "description": "chi haja nadya", "price": 150}
response = requests.get(endpoint)
print(response.json())
