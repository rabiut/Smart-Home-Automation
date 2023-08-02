import os
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Get sunrise and sunset times
API_KEY = os.getenv('API_KEY')
LATITUDE = os.getenv('LATITUDE')
LONGITUDE = os.getenv('LONGITUDE')
response = requests.get(f"https://api.ipgeolocation.io/astronomy?apiKey={API_KEY}&lat={LATITUDE}&long={LONGITUDE}")
data = response.json()

sunrise = datetime.strptime(data['sunrise'], "%H:%M").time()
sunset = datetime.strptime(data['sunset'], "%H:%M").time()

print(f'Sunrise: {sunrise.hour}:{sunrise.minute}')
print(f'Sunset: {sunset.hour}:{sunset.minute}')

# Schedule scripts to run at sunrise and sunset
# os.system(f'echo "/bin/bash -c \'source /home/pi/project/env/bin/activate && /home/pi/project/env/bin/python3 /home/pi/project/website/APIs/wiz/outside_bulbsOFF.py\'" | at {sunrise.hour}:{sunrise.minute:02d}')
# os.system(f'echo "/bin/bash -c \'source /home/pi/project/env/bin/activate && /home/pi/project/env/bin/python3 /home/pi/project/website/APIs/wiz/outside_bulbsON.py\'" | at {sunset.hour}:{sunset.minute:02d}')
#
os.system(f'echo "/home/pi/project/env/bin/python3 /home/pi/project/website/APIs/wiz/outside_bulbsOFF.py" | at {sunrise.hour}:{sunrise.minute:02d}')
os.system(f'echo "/home/pi/project/env/bin/python3 /home/pi/project/website/APIs/wiz/outside_bulbsON.py" | at {sunset.hour}:{sunset.minute:02d}')
