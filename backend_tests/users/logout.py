#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/users/logout/"
data = {"username": "ouafi", "password":"Epickeen1"}

response = requests.post(endpoint)
print(response.json())
