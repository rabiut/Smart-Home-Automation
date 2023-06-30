import sys
import os
# import json
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

devices_request = service.enterprises().devices().list(
    parent='enterprises/0fb5e183-9cef-4050-b3fe-8184d6ff5951')
devices_response = devices_request.execute()

devices = devices_response.get('devices', [])

for device in devices:
    if device.get('type') == 'sdm.devices.types.THERMOSTAT':
        device_name = device.get('name')
        if device_name:
            try:
                command = {
                    'command': 'sdm.devices.commands.ThermostatTemperatureSetpoint.SetHeat',
                    'params': {
                        'heatCelsius': float(sys.argv[1])
                    }
                }
                request = service.enterprises().devices().executeCommand(
                    name=device_name, body=command)
                response = request.execute()
                print(f"Set heat temperature response: {response}")

            except Exception as e:
                print(f"Error occurred while setting temperature: {str(e)}")
