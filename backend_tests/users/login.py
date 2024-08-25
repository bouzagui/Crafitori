#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/users/login/"
data = {"username": "ouafi", "password":"Epickeen1"}

response = requests.post(endpoint, json=data)
print(response.json())
