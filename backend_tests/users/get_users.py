#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/users/"
response = requests.get(endpoint)
print(response.json())
