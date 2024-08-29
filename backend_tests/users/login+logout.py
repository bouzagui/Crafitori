#!/usr/bin/python3
import requests

# Create a session object
session = requests.Session()

# Login
login_endpoint = "http://localhost:8000/api/users/login/"
login_data = {"username": "Pewdiepie", "password": "Floorgang"}

login_response = session.post(login_endpoint, json=login_data)
print("Login response:", login_response.json())

# Logout (using the same session)
logout_endpoint = "http://localhost:8000/api/users/logout/"
logout_response = session.post(logout_endpoint)
print("Logout response:", logout_response.json())
