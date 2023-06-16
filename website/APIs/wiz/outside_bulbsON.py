from pywizlight import wizlight, PilotBuilder, discovery
import asyncio

async def main():
    IP1 = "192.168.2.56"
    IP2 = "192.168.2.57"
    IP3 = "192.168.2.58"

    bulb1 = wizlight(IP1)
    bulb2 = wizlight(IP2)
    bulb3 = wizlight(IP3)


    # Set brightness to maximum
    pilot1 = PilotBuilder(brightness=255)
    pilot2 = PilotBuilder(brightness=255)
    pilot3 = PilotBuilder(brightness=255)
    
    # Turn on the bulbs
    await bulb1.turn_on(pilot1)
    await bulb2.turn_on(pilot2)
    await bulb3.turn_on(pilot3)

if __name__ == "__main__":
    asyncio.run(main())

    
    
