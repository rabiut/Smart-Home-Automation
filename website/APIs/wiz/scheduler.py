import os
import requests
from datetime import datetime

# Get sunrise and sunset times
API_KEY = "3768ab5ae7d64a399b0677add9081e81"
LATITUDE = "43.255722"
LONGITUDE = "-79.871101"
response = requests.get(f"https://api.ipgeolocation.io/astronomy?apiKey={API_KEY}&lat={LATITUDE}&long={LONGITUDE}")
data = response.json()

sunrise = datetime.strptime(data['sunrise'], "%H:%M").time()
sunset = datetime.strptime(data['sunset'], "%H:%M").time()

print(f'Sunrise: {sunrise.hour}:{sunrise.minute}')
print(f'Sunset: {sunset.hour}:{sunset.minute}')

# Schedule scripts to run at sunrise and sunset
os.system(f'echo "/bin/bash -c \'source /home/pi/project/env/bin/activate && /home/pi/project/env/bin/python3 /home/pi/project/website/APIs/wiz/outside_bulbsOFF.py\'" | at {sunrise.hour}:{sunrise.minute:02d}')
os.system(f'echo "/bin/bash -c \'source /home/pi/project/env/bin/activate && /home/pi/project/env/bin/python3 /home/pi/project/website/APIs/wiz/outside_bulbsON.py\'" | at {sunset.hour}:{sunset.minute:02d}')
