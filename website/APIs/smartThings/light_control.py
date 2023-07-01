import requests
import json
import sys
import os
from dotenv import load_dotenv

load_dotenv()

# replace with your actual token
API_TOKEN = 'SMARTTHINGS_TOKEN'


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

    if response.status_code == 200 or response.status_code == 202:  # 200 OK, 202 Accepted
        return {"success": True}
    else:
        return {"success": False}


def main():
    task = sys.argv[1]
    device_id = sys.argv[2]

    if task not in ["on", "off", "brightness"]:
        raise ValueError(
            "Invalid task. Choose from: 'on', 'off', 'brightness'")

    if task == "brightness":
        if len(sys.argv) < 4:
            raise ValueError("Brightness requires a third argument.")
        brightness_level = int(sys.argv[3])
        result = post_command(device_id, "setLevel", brightness_level)
    else:  # 'on' or 'off'
        result = post_command(device_id, task)

    print(json.dumps(result, indent=4))


if __name__ == "__main__":
    main()
