#!/usr/bin/python3
import requests

user_id = input("User ID: ")

endpoint = f"http://localhost:8000/api/users/{user_id}"
response = requests.get(endpoint)
print(response.json())
