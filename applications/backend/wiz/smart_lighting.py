from pywizlight import wizlight, PilotBuilder
import asyncio
import json
import sys
import logging

# Set up logging
logging.basicConfig(filename='python_log.log', level=logging.INFO, 
                    format='%(asctime)s %(levelname)s: %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')

# Log that the script is running
logging.info("Python script started running.")

bulbs = {
    'taiwo_bedroom': ["192.168.2.49", "192.168.2.50"],
    'porch': ["192.168.2.56", "192.168.2.57", "192.168.2.58"],
    'kenny_bedroom': ["192.168.2.59", "192.168.2.60"],
    # ...
}

async def turn_on(bulb):
    try:
        pilot = PilotBuilder(brightness=255)
        await bulb.turn_on(pilot)
        return {"success": True}
    except Exception as e:
        logging.error(f"Failed to turn on the bulb {bulb}: {e}")
        return {"success": False}

async def turn_off(bulb):
    try:
        await bulb.turn_off()
        return {"success": True}
    except Exception as e:
        logging.error(f"Failed to turn off the bulb {bulb}: {e}")
        return {"success": False}

async def get_single_bulb_brightness(bulb):
    try:
        state = await bulb.updateState()
        return state.get_brightness()
    except Exception as e:
        logging.error(f"Failed to get brightness for bulb {bulb}: {e}")
        return "Unreachable"

async def get_single_bulb_status(bulb):
    try:
        state = await bulb.updateState()
        return state.get_state()
    except Exception as e:
        logging.error(f"Failed to get status for bulb {bulb}: {e}")
        return "Unreachable"

async def get_status_and_brightness(room_bulbs):
    bulb_status_and_brightness = await asyncio.gather(*[func(bulb) for bulb in room_bulbs for func in [get_single_bulb_status, get_single_bulb_brightness]])

    status_list = [res for res in bulb_status_and_brightness[::2] if res != "Unreachable"]
    brightness_list = [res for res in bulb_status_and_brightness[1::2] if res != "Unreachable"]

    if status_list and brightness_list:  # check if lists are not empty
        # Determine the status
        if all(status_list):
            status = True
        elif not any(status_list):
            status = False
        else:
            status = "Different"

        # Calculate the average brightness
        brightness = sum(brightness_list) / len(brightness_list)

        unreachable = False  # all bulbs are reachable
    else:
        status = "Unavailable"
        brightness = "Unknown"
        unreachable = True  # at least one bulb is unreachable

    return {"status": status, "brightness": brightness, "unreachable": unreachable}



async def get_status(room_bulbs):
    bulb_status = await asyncio.gather(*(get_single_bulb_status(bulb) for bulb in room_bulbs))

    if all(bulb_status):  # all bulbs are on
        return True
    elif not any(bulb_status):  # all bulbs are off
        return False
    else:  # bulbs are in different states
        return "Different"

async def get_all_status():
    room_statuses = []
    for room, room_bulbs in bulbs.items():
        room_bulbs = [wizlight(ip) for ip in bulbs.get(room, [])]
        status_and_brightness = await get_status_and_brightness(room_bulbs)

        # Map room id to human-friendly name, you might want to adjust this mapping to match your needs
        room_names = {
            "taiwo_bedroom": "Taiwo's Bedroom",
            "porch": "Porch",
            "kenny_bedroom": "Kenny's Bedroom",
            # Add more mappings as necessary
        }

        # Adjust the format of the room_status dictionary to match the desired output
        room_status = {
            "id": room,
            "name": room_names.get(room, "Unknown"),
            "light": {
                "status": status_and_brightness["status"],
                "brightness": status_and_brightness["brightness"] if status_and_brightness["status"] != "Unavailable" else None
            }
        }
        room_statuses.append(room_status)

    # Print room statuses to console
    print(json.dumps({"rooms": room_statuses}, indent=4))




async def set_brightness(bulb, brightness):
    pilot = PilotBuilder(brightness=brightness)
    await bulb.turn_on(pilot)

async def main():
    task = sys.argv[1]
    if task == "all_status":
        await get_all_status()
    else:
        room = sys.argv[2]
        room_bulbs = [wizlight(ip) for ip in bulbs.get(room, [])]
        if task == "on":
            results = await asyncio.gather(*(turn_on(bulb) for bulb in room_bulbs))
            print(json.dumps({"results": results}, indent=4))  # print the result to stdout
        elif task == "off":
            results = await asyncio.gather(*(turn_off(bulb) for bulb in room_bulbs))
            print(json.dumps({"results": results}, indent=4))  # print the result to stdout
        elif task == "status":
            state = await get_status(room_bulbs)
            print(json.dumps({"state": state}, indent=4))  # print the status to stdout
        elif task == "brightness":
            brightness_level = int(sys.argv[3])
            await asyncio.gather(*(set_brightness(bulb, brightness_level) for bulb in room_bulbs))


if __name__ == "__main__":
    asyncio.run(main())
