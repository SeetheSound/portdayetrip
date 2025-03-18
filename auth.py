import os
import requests

AUTH0_DOMAIN = os.getenv('AUTH0_DOMAIN')
CLIENT_ID = os.getenv('AUTH0_CLIENT_ID')
CLIENT_SECRET = os.getenv('AUTH0_CLIENT_SECRET')

def get_auth0_token():
    url = f'https://{AUTH0_DOMAIN}/oauth/token'
    payload = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'audience': f'https://{AUTH0_DOMAIN}/api/v2/',
        'grant_type': 'client_credentials'
    }
    response = requests.post(url, json=payload)
    return response.json().get('access_token')
