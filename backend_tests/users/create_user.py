#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/users/register/"
data = {"username": "Pewdiepie", "email": "pewdiepie97@gmail.com", "password":"Floorgang", "confirm_password": "Floorgang"}

response = requests.post(endpoint, json=data)
print(response.json())
