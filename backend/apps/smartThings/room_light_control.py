import requests
import json
import sys
import os
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = os.getenv('SMARTTHINGS_TOKEN')

def get_device_ids(room_id):
    url = f"https://api.smartthings.com/v1/devices"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }
    response = requests.get(url, headers=headers)
    devices = response.json()['items']

    device_ids = []
    for device in devices:
        if device['roomId'] == room_id:
            for component in device['components']:
                for category in component['categories']:
                    if category['name'] == "Light":
                        device_ids.append(device['deviceId'])

    return device_ids


def post_command(device_id, command, argument=None):
    url = f"https://api.smartthings.com/v1/devices/{device_id}/commands"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "commands": []
    }

    if command in ["on", "off"]:
        data["commands"].append({
            "component": "main",
            "capability": "switch",
            "command": command
        })

    if command == "setLevel" or command == "on":
        if command == "setLevel" and argument is None:
            raise ValueError("setLevel command requires an argument.")
        level = argument if command == "setLevel" else 100
        data["commands"].append({
            "component": "main",
            "capability": "switchLevel",
            "command": "setLevel",
            "arguments": [level]
        })

    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200 or response.status_code == 202:
        return {"success": True}
    else:
        return {"success": False}


def main():
    room_id = sys.argv[1]
    task = sys.argv[2]

    if task not in ["on", "off", "brightness"]:
        raise ValueError("Invalid task. Choose from: 'on', 'off', 'brightness'")

    device_ids = get_device_ids(room_id)

    results = []
    for device_id in device_ids:
        if task == "brightness":
            if len(sys.argv) < 4:
                raise ValueError("Brightness requires a third argument.")
            brightness_level = int(sys.argv[3])
            result = post_command(device_id, "setLevel", brightness_level)
        else:
            result = post_command(device_id, task)
        results.append(result)

    print(json.dumps(results, indent=4))


if __name__ == "__main__":
    main()
