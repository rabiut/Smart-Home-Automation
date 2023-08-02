
import asyncio
import aiohttp
import os
from dotenv import load_dotenv
from pymyq import login
from pymyq.garagedoor import STATE_CLOSED, STATE_OPEN

load_dotenv()  # load variables from .env

myq_email = os.getenv("MYQ_EMAIL")
myq_password = os.getenv("MYQ_PASSWORD")

async def main():
    async with aiohttp.ClientSession() as session:
        account = await login(myq_email, myq_password, session)

        for device in account.devices.values():
            if device.device_family == 'garagedoor':
                print(f"Device {device.name} ({device.device_id}) is {device.state}")

                if device.state == STATE_CLOSED:
                    await device.open()
                    print(f"Device {device.name} ({device.device_id}) is now open")
                elif device.state == STATE_OPEN:
                    await device.close()
                    print(f"Device {device.name} ({device.device_id}) is now closed")

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
    loop.close()
