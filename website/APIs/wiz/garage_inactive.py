import requests
import json
import sys

# replace with your actual token
API_TOKEN = '2e6a95e5-e0d4-455f-8fd7-41c0e8adcea2'


def post_command(device_id, command):
    url = f"https://api.smartthings.com/v1/devices/{device_id}/commands"

    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }

    data = {
        "commands": [{
            "component": "main",
            "capability": "switch",
            "command": command
        }]
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200 or response.status_code == 202:  # 200 OK, 202 Accepted
        return {"success": True}
    else:
        return {"success": False}


def get_status(device_id):
    url = f"https://api.smartthings.com/v1/devices/{device_id}/status"

    headers = {
        "Authorization": f"Bearer {API_TOKEN}"
    }

    response = requests.get(url, headers=headers)
    status = response.json()

    try:
        bulb_status = status["components"]["main"]["switch"]["switch"]["value"]
        return bulb_status
    except KeyError:
        raise ValueError(f"Unable to get status for device {device_id}")


def main():
    device_id = sys.argv[1]
    bulb_status = get_status(device_id)

    if bulb_status == "on":
        result = post_command(device_id, "off")
        print(json.dumps(result, indent=4))


if __name__ == "__main__":
    main()
