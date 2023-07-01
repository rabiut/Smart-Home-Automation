import asyncio
import aiohttp
import os
from dotenv import load_dotenv
import json
from pymyq import login
from pymyq.garagedoor import STATE_OPEN


load_dotenv()  # load variables from .env

myq_email = os.getenv("MYQ_EMAIL")
myq_password = os.getenv("MYQ_PASSWORD")

async def main():
    async with aiohttp.ClientSession() as session:
        account = await login("tktrabiu@gmail.com", "!TRAKFAM3K", session)

        door_status = {}
        for device in account.devices.values():
            if device.device_family == 'garagedoor':
                door_status[device.device_id] = device.state == STATE_OPEN

        print(json.dumps(door_status))

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
    loop.close()
