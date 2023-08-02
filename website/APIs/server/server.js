const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
app.use(express.json());
app.use(cors());

const pythonPath = "/home/pi/project/env/bin/python3";

app.get('/api/v1/readTemp', (req, res) => {
    exec(`${pythonPath} ../nest/read_temp.py`, (err, stdout, stderr) => {
        // ... rest of the code
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            // Assuming stdout contains the temperature value
            const temperature = parseFloat(stdout);

            if (isNaN(temperature)) {
                console.error("Invalid temperature data received from Python script.");
                res.json({ success: false });
            } else {
                res.json({ success: true, temperature: temperature });
            }
        }
    });
});

app.post('/api/v1/setCoolTemp', (req, res) => {
    const data = req.body;

    exec(`${pythonPath} ../nest/smart_thermostat.py set_cool_temp ${data.temp}`, (err, stdout, stderr) => {
        // ... rest of the code
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            // Assuming stdout contains the JSON response from Python script
            const response = JSON.parse(stdout);
            res.json(response);  // Directly return the response object
        }
    });
});

app.post('/api/v1/setHeatTemp', (req, res) => {
    const data = req.body;

    exec(`${pythonPath} ../nest/smart_thermostat.py set_heat_temp ${data.temp}`, (err, stdout, stderr) => {
        // ... rest of the code
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            // Assuming stdout contains the JSON response from Python script
            const response = JSON.parse(stdout);
            res.json(response);  // Directly return the response object
        }
    });
});

app.post('/api/v1/turnOffThermostat', (req, res) => {
    exec(`${pythonPath} ../nest/smart_thermostat.py turn_off`, (err, stdout, stderr) => {
        // ... rest of the code
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            // Assuming stdout contains the JSON response from Python script
            const response = JSON.parse(stdout);
            res.json(response);  // Directly return the response object
        }
    });
});

app.get('/api/v1/getModeAndTemp', (req, res) => {
    exec(`${pythonPath} ../nest/smart_thermostat.py get_mode_temp`, (err, stdout, stderr) => {
        // ... rest of the code
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            // Assuming stdout contains the JSON response from Python script
            const response = JSON.parse(stdout);
            res.json(response);  // Directly return the response object
        }
    });
});

app.get('/api/v1/fetchDevices', (req, res) => {
    exec(`${pythonPath} ../smartThings/fetch_devices.py`, (err, stdout, stderr) => {
        // ... rest of the code
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            // stdout should contain the JSON string with the status of all rooms
            const status = JSON.parse(stdout);
            res.json(status);  // Directly return the status object
        }
    });
});

app.post('/api/v1/lights', (req, res) => {
    const data = req.body;
    let scriptPath = '../smartThings/light_control.py';

    let command = `${pythonPath} ${scriptPath} ${data.action} ${data.device_id}`;

    // Add brightness level to the command if it is provided
    if (data.action === "brightness" && data.brightness_level) {
        command += ` ${data.brightness_level}`;
    }

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            const status = JSON.parse(stdout);
            res.json({ success: true, status: status });
        }
    });
});

app.listen(5000, '0.0.0.0', () => console.log('Server is running on port 5000'));
