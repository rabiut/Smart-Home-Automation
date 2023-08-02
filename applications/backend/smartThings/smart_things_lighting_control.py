import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

SMARTTHINGS_TOKEN = os.getenv('SMARTTHINGS_TOKEN')  # replace with your token
HEADERS = {
    'Authorization': 'Bearer {}'.format(SMARTTHINGS_TOKEN),
    'Content-Type': 'application/json',
}
BASE_URL = 'https://api.smartthings.com/v1/devices'


def fetch_lights():
    response = requests.get(BASE_URL, headers=HEADERS)
    response.raise_for_status()
    devices = response.json().get('items', [])
    lights = [
        {'label': device['label'], 'deviceId': device['deviceId'],
         'roomId': device['roomId'], 'locationId': device['locationId']}
        for device in devices
        if 'Light' in (category['name'] for category in device['components'][0]['categories'])
    ]
    return lights


def get_device_status(device_id):
    url = f"{BASE_URL}/{device_id}/status"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    status_data = response.json()
    switch_status = status_data['components']['main']['switch']['switch']['value']
    brightness = status_data['components']['main']['switchLevel']['level']['value'] if switch_status == 'on' else 0
    return switch_status, brightness


def get_room_name(room_id, location_id):
    url = f"https://api.smartthings.com/v1/locations/{location_id}/rooms/{room_id}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    room_data = response.json()
    return room_data['name']


def main():
    lights = fetch_lights()
    for light in lights:
        status, brightness = get_device_status(light['deviceId'])
        light['status'] = status
        light['brightness'] = brightness

    room_statuses = {}
    for light in lights:
        room_id = light.pop('roomId')
        location_id = light.pop('locationId')
        if room_id not in room_statuses:
            room_name = get_room_name(room_id, location_id)
            room_statuses[room_id] = {
                'status': 'off',
                'roomName': room_name,
                'lights': [],
            }
        room_statuses[room_id]['lights'].append(light)

        if any(light['status'] == 'on' for light in room_statuses[room_id]['lights']):
            room_statuses[room_id]['status'] = 'on'

    output = {'items': room_statuses}

    script_dir = os.path.dirname(os.path.realpath(__file__))
    status_path = os.path.join(script_dir, 'room_statuses.json')
    with open(status_path, 'w') as f:
        json.dump(output, f)


if __name__ == '__main__':
    main()
