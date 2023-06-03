import os
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import pickle
from googleapiclient.discovery import build


# The CLIENT_ID and CLIENT_SECRET you got from the Google Cloud Console
CLIENT_ID = '986207922032-26pg2rnsrbjf5f1lk224h42omp4u9ljt.apps.googleusercontent.com'
CLIENT_SECRET = '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'

# The scope for the Smart Device Management API
SCOPES = ['https://www.googleapis.com/auth/sdm.service']

creds = None

# The file token.pickle stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first time.
if os.path.exists('token.pickle'):
    with open('token.pickle', 'rb') as token:
        creds = pickle.load(token)

# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_config(
            {"web": {"client_id": CLIENT_ID, "client_secret": CLIENT_SECRET, "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token"}},
            scopes=SCOPES
        )
        creds = flow.run_local_server(port=41567)
    # Save the credentials for the next run
    with open('token.pickle', 'wb') as token:
        pickle.dump(creds, token)

# Build the service
service = build('smartdevicemanagement', 'v1', credentials=creds)

# Replace 'enterprises/project-id' with your Project ID
request = service.enterprises().devices().list(parent='enterprises/0fb5e183-9cef-4050-b3fe-8184d6ff5951')

# Execute the request
response = request.execute()

# Assuming devices is your list of devices:
devices = response.get('devices', [])
for device in devices:
    if device.get('type') == 'sdm.devices.types.THERMOSTAT':
        device_name = device.get('name')

        if device_name:
            try:
                # Get details of the device
                request = service.enterprises().devices().get(name=device_name)
                response = request.execute()

                # Extract the current temperature in Celsius, if available
                traits = response.get('traits', {})
                temperature_traits = traits.get('sdm.devices.traits.Temperature')
                if temperature_traits:
                    current_temperature_celsius = temperature_traits.get('ambientTemperatureCelsius')
                    if current_temperature_celsius is not None:
                        print(f"Current temperature: {current_temperature_celsius}°C")
                        
                    else:
                        print("Current temperature data is not available.")
                else:
                    print("Temperature traits not found for this device.")
            except Exception as e:
                print(f"Error occurred while fetching device details: {str(e)}")
        else:
            print("Device name is not available.")
    else:
        print("No thermostat found.")
