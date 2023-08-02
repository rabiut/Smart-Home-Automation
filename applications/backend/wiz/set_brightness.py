from pywizlight import wizlight, PilotBuilder
import asyncio

# Replace with your bulbs' IP addresses
IP1 = "192.168.2.49"
IP2 = "192.168.2.50"
bulb1 = wizlight(IP1)
bulb2 = wizlight(IP2)

async def set_brightness(bulb, brightness):
    pilot = PilotBuilder(brightness=brightness)
    await bulb.turn_on(pilot)

async def main():
    brightness_level = 50  # Set desired brightness level here
    await set_brightness(bulb1, brightness_level)
    await set_brightness(bulb2, brightness_level)

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    try:
        loop.run_until_complete(main())
    finally:
        loop.close()
