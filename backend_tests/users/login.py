#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/users/login/"
data = {"username": "Pewdiepie", "password":"Floorgang"}

response = requests.post(endpoint, json=data)
print(response.json())
