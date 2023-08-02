from pywizlight import wizlight, PilotBuilder, discovery
import asyncio

async def main():
    IP1 = "192.168.2.49"
    IP2 = "192.168.2.50"
    bulb1 = wizlight(IP1)
    bulb2 = wizlight(IP2)


    # Set brightness to maximum
    pilot1 = PilotBuilder(brightness=255)
    pilot2 = PilotBuilder(brightness=255)
    
    # Turn on the bulbs
    await bulb1.turn_on(pilot1)
    await bulb2.turn_on(pilot2)

if __name__ == "__main__":
    asyncio.run(main())

    
    
