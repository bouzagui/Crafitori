#!/usr/bin/python3

#!/usr/bin/python3

import requests

endpoint = "http://localhost:8000/api/users/2/update/"
data = {"username": "smox", "email":"smox@gmail.com" }
response = requests.put(endpoint, json=data)
print(response.json())
