from pywizlight import wizlight
import asyncio
import json

async def main():
    IP1 = "192.168.2.49"
    IP2 = "192.168.2.50"
    bulb1 = wizlight(IP1)
    bulb2 = wizlight(IP2)

    # Get the status of the bulbs
    status1 = await bulb1.updateState()
    status2 = await bulb2.updateState()

    # Output the status as JSON
    if status1.get_state() and status2.get_state():  # both bulbs are on
        state = True
    elif not status1.get_state() and not status2.get_state():  # both bulbs are off
        state = False
    else:  # bulbs are in different states
        return

    print(json.dumps({
        "state": state,
    }, indent=4))

if __name__ == "__main__":
    asyncio.run(main())
