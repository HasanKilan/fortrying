from jose import jwt

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJxYXp3c3hAZXhhbXBsZS5jb20iLCJleHAiOjE3NDY1OTczMTF9.vwjGgWBgd4ohg0OjHhmrvEpIcx9RWGqZkDsEvJvpIPY"
secret = "XhPrTkgnivtBj4lehYrij4klyE7WDYB5ZOg92U1XRL0="

payload = jwt.decode(token, secret, algorithms=["HS256"])
print(payload)
