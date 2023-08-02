const fs = require('fs');
const { google } = require('googleapis');
const express = require('express');
const open = import('open');
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID = '986207922032-26pg2rnsrbjf5f1lk224h42omp4u9ljt.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const SCOPES = ['https://www.googleapis.com/auth/sdm.service'];
const TOKEN_PATH = 'token.json';

let credentials = null;
if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH);
    credentials = JSON.parse(token);
}

const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:41567'
);

const service = google.smartdevicemanagement({
    version: 'v1',
    auth: oauth2Client,
});

function fetchDevices() {
    const devicesListRequest = service.enterprises.devices.list({
        parent: 'enterprises/0fb5e183-9cef-4050-b3fe-8184d6ff5951',
    });

    devicesListRequest.then(response => {
        const devices = response.data.devices || [];
        devices.forEach(device => {
            if (device.type === 'sdm.devices.types.THERMOSTAT') {
                const deviceName = device.name;
                if (deviceName) {
                    service.enterprises.devices.get({name: deviceName}).then(response => {
                        const traits = response.data.traits || {};
                        const temperatureTraits = traits['sdm.devices.traits.Temperature'];
                        if (temperatureTraits) {
                            const currentTemperatureCelsius = temperatureTraits.ambientTemperatureCelsius;
                            if (currentTemperatureCelsius !== undefined) {
                                console.log(`Current temperature: ${currentTemperatureCelsius}°C`);
                            } else {
                                console.log("Current temperature data is not available.");
                            }
                        } else {
                            console.log("Temperature traits not found for this device.");
                        }
                    }).catch(err => {
                        console.error(`Error occurred while fetching device details: ${err}`);
                    });
                } else {
                    console.log("Device name is not available.");
                }
            } else {
                console.log("No thermostat found.");
            }
        });
    }).catch(err => {
        console.error(`Error occurred while fetching devices: ${err}`);
    });
}

if (!credentials) {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    console.log('Authorize this app by visiting this url:', authUrl);

    const app = express();

    app.get('/', (req, res) => {
        const code = req.query.code;
        oauth2Client.getToken(code, (err, token) => {
            if (err) {
                console.error('Failed to retrieve access token', err);
                return res.status(500).send(err);
            }

            oauth2Client.setCredentials(token);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));

            console.log('Token stored to', TOKEN_PATH);
            res.send('Success! Please return to the application.');

            fetchDevices();
        });
    });

    app.listen(41567, async () => {
        console.log(`App listening at http://localhost:41567`);
        const openModule = await open;
        openModule.default(authUrl);
    });
} else {
    oauth2Client.setCredentials(credentials);
    fetchDevices();
}
