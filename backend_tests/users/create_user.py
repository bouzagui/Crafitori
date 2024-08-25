#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/users/register/"
data = {"username": "shushu", "email": "shushu@gmail.com", "password":"Cute girl", "confirm_password": "Cute girl"}

response = requests.post(endpoint, json=data)
print(response.json())
