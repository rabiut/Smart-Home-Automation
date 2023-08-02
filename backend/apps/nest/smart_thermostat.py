import os
import sys
import json
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

CLIENT_ID = '986207922032-26pg2rnsrbjf5f1lk224h42omp4u9ljt.apps.googleusercontent.com'
CLIENT_SECRET = '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'
SCOPES = ['https://www.googleapis.com/auth/sdm.service']


def get_authorization():
    flow = InstalledAppFlow.from_client_config(
        {"web": {"client_id": CLIENT_ID, "client_secret": CLIENT_SECRET,
                 "auth_uri": "https://accounts.google.com/o/oauth2/auth", 
                 "token_uri": "https://oauth2.googleapis.com/token"}},
        scopes=SCOPES
    )
    return flow.run_local_server(port=41567)

def authenticate():
    creds = None

    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except:
                creds = get_authorization() # If refresh fails, get new authorization
        else:
            creds = get_authorization()

        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    
    service = build('smartdevicemanagement', 'v1', credentials=creds)

    return service

def get_temperature(service):
    # get the devices list
    devices = service.enterprises().devices().list(parent='enterprises/0fb5e183-9cef-4050-b3fe-8184d6ff5951').execute()

    # loop over the devices and get the current temperature
    for device in devices['devices']:
        if 'traits' in device and 'sdm.devices.traits.Temperature' in device['traits']:
            print(device['traits']['sdm.devices.traits.Temperature']['ambientTemperatureCelsius'])

def set_cool_temperature(service, cool_celsius):
    try:
        devices = service.enterprises().devices().list(parent='enterprises/0fb5e183-9cef-4050-b3fe-8184d6ff5951').execute()

        # Set default success status as False
        success = False
        
        for device in devices['devices']:
            if 'traits' in device and 'sdm.devices.traits.ThermostatMode' in device['traits']:
                service.enterprises().devices().executeCommand(
                    name=device['name'],
                    body={
                        'command': 'sdm.devices.commands.ThermostatMode.SetMode',
                        'params': {'mode': 'COOL'}
                    }
                ).execute()
                
                response = service.enterprises().devices().executeCommand(
                    name=device['name'],
                    body={
                        'command': 'sdm.devices.commands.ThermostatTemperatureSetpoint.SetCool',
                        'params': {'coolCelsius': cool_celsius}
                    }
                ).execute()

                # If there is no error in the response, then the operation was successful
                if not 'error' in response:
                    success = True
        
        print(json.dumps({'success': success}))

    except Exception as e:
        print(json.dumps({'success': False, 'error': str(e)}))

def set_heat_temperature(service, heat_celsius):
    try:
        devices = service.enterprises().devices().list(parent='enterprises/0fb5e183-9cef-4050-b3fe-8184d6ff5951').execute()

        # Set default success status as False
        success = False

        for device in devices['devices']:
            if 'traits' in device and 'sdm.devices.traits.ThermostatMode' in device['traits']:
                service.enterprises().devices().executeCommand(
                    name=device['name'],
                    body={
                        'command': 'sdm.devices.commands.ThermostatMode.SetMode',
                        'params': {'mode': 'HEAT'}
                    }
                ).execute()

                response = service.enterprises().devices().executeCommand(
                    name=device['name'],
                    body={
                        'command': 'sdm.devices.commands.ThermostatTemperatureSetpoint.SetHeat',
                        'params': {'heatCelsius': heat_celsius}
                    }
                ).execute()

                # If there is no error in the response, then the operation was successful
                if not 'error' in response:
                    success = True
        
        print(json.dumps({'success': success}))

    except Exception as e:
        print(json.dumps({'success': False, 'error': str(e)}))

def turn_off_thermostat(service):
    try:
        devices = service.enterprises().devices().list(parent='enterprises/0fb5e183-9cef-4050-b3fe-8184d6ff5951').execute()

        # Set default success status as False
        success = False

        for device in devices['devices']:
            if 'traits' in device and 'sdm.devices.traits.ThermostatMode' in device['traits']:
                response = service.enterprises().devices().executeCommand(
                    name=device['name'],
                    body={
                        'command': 'sdm.devices.commands.ThermostatMode.SetMode',
                        'params': {'mode': 'OFF'}
                    }
                ).execute()

                # If there is no error in the response, then the operation was successful
                if not 'error' in response:
                    success = True
        
        print(json.dumps({'success': success}))

    except Exception as e:
        print(json.dumps({'success': False, 'error': str(e)}))

def get_mode_and_temperature(service):
    try:
        devices = service.enterprises().devices().list(parent='enterprises/0fb5e183-9cef-4050-b3fe-8184d6ff5951').execute()

        for device in devices['devices']:
            if 'traits' in device:
                temp_traits = 'sdm.devices.traits.Temperature'
                mode_traits = 'sdm.devices.traits.ThermostatMode'
                if temp_traits in device['traits'] and mode_traits in device['traits']:
                    temperature = device['traits'][temp_traits]['ambientTemperatureCelsius']
                    mode = device['traits'][mode_traits]['mode']
                    print(json.dumps({'temperature': temperature, 'mode': mode}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))

def main():
    service = authenticate()

    task = sys.argv[1]
    if task == "read_temp":
        get_temperature(service)
    elif task == "set_cool_temp":
        cool_celsius = float(sys.argv[2])
        set_cool_temperature(service, cool_celsius)
    elif task == "set_heat_temp":
        heat_celsius = float(sys.argv[2])
        set_heat_temperature(service, heat_celsius)
    elif task == "turn_off":
        turn_off_thermostat(service)
    elif task == "get_mode_temp":
        get_mode_and_temperature(service)

if __name__ == "__main__":
    main()
