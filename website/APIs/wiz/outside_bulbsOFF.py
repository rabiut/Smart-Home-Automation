from pywizlight import wizlight, PilotBuilder, discovery
import asyncio

async def main():
    # Replace with your bulbs' IP addresses
    IP1 = "192.168.2.56"
    IP2 = "192.168.2.57"
    IP3 = "192.168.2.58"

    bulb1 = wizlight(IP1)
    bulb2 = wizlight(IP2)
    bulb3 = wizlight(IP3)

    
    # Turn off the bulbs
    await bulb1.turn_off()
    await bulb2.turn_off()
    await bulb3.turn_off()

if __name__ == "__main__":
    asyncio.run(main())
