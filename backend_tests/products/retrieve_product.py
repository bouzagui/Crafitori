#!/usr/bin/python3

import requests
from sys import argv
id = argv[1]

endpoint = f"http://localhost:8000/api/products/{id}"
data = {"title": "Iphone 14", "price": 1000 }
response = requests.get(endpoint)
print(response.json())
