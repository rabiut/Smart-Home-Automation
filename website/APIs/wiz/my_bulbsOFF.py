from pywizlight import wizlight, PilotBuilder, discovery
import asyncio

async def main():
    # Replace with your bulbs' IP addresses
    IP1 = "192.168.2.49"
    IP2 = "192.168.2.50"
    bulb1 = wizlight(IP1)
    bulb2 = wizlight(IP2)
    
    # Turn off the bulbs
    await bulb1.turn_off()
    await bulb2.turn_off()

if __name__ == "__main__":
    asyncio.run(main())
