import os
import json
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import pickle
from googleapiclient.discovery import build

CLIENT_ID = '986207922032-26pg2rnsrbjf5f1lk224h42omp4u9ljt.apps.googleusercontent.com'
CLIENT_SECRET = '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'

SCOPES = ['https://www.googleapis.com/auth/sdm.service']

creds = None

if os.path.exists('token.pickle'):
    with open('token.pickle', 'rb') as token:
        creds = pickle.load(token)

if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_config(
            {"web": {"client_id": CLIENT_ID, "client_secret": CLIENT_SECRET,
                     "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token"}},
            scopes=SCOPES
        )
        creds = flow.run_local_server(port=41567)
    with open('token.pickle', 'wb') as token:
        pickle.dump(creds, token)

service = build('smartdevicemanagement', 'v1', credentials=creds)

request = service.enterprises().devices().list(
    parent='enterprises/0fb5e183-9cef-4050-b3fe-8184d6ff5951')

response = request.execute()

devices = response.get('devices', [])
for device in devices:
    if device.get('type') == 'sdm.devices.types.THERMOSTAT':
        device_name = device.get('name')

        if device_name:
            try:
                request = service.enterprises().devices().get(name=device_name)
                response = request.execute()

                traits = response.get('traits', {})
                temperature_traits = traits.get(
                    'sdm.devices.traits.Temperature')
                if temperature_traits:
                    current_temperature_celsius = temperature_traits.get(
                        'ambientTemperatureCelsius')
                    if current_temperature_celsius is not None:
                        # write the current temperature to a file
                        with open('./temperature.json', 'w') as f:
                            json.dump({"temperature": current_temperature_celsius}, f)
                            print(current_temperature_celsius)

                    else:
                        print("Current temperature data is not available.")
                else:
                    print("Temperature traits not found for this device.")
            except Exception as e:
                print(
                    f"Error occurred while fetching device details: {str(e)}")
        else:
            print("Device name is not available.")
    else:
        print("No thermostat found.")
