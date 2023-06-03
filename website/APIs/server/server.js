const express = require('express');
const { exec } = require('child_process');
const app = express();
app.use(express.json());

app.get('/api/v1/readTemp', (req, res) => {
    exec('python3 /path/to/your/read_temp.py', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            res.json({ success: true, temp: stdout });
        }
    });
});

// app.post('/api/v1/setTemp', (req, res) => {
//     const data = req.body;
//     exec(`python3 /path/to/your/set_temp.py ${data.temp}`, (err, stdout, stderr) => {
//         if (err) {
//             console.error(err);
//             res.json({ success: false });
//         } else {
//             res.json({ success: true });
//         }
//     });
// });

// app.post('/api/v1/lights', (req, res) => {
//     const data = req.body;
//     let scriptPath = '';
    
//     switch (data.action) {
//         case 'on':
//             scriptPath = '/path/to/your/turn_on_lights.py';
//             break;
//         case 'off':
//             scriptPath = '/path/to/your/turn_off_lights.py';
//             break;
//         case 'dim':
//             scriptPath = '/path/to/your/dim_lights.py';
//             break;
//         default:
//             return res.json({ success: false, message: 'Invalid action' });
//     }
    
//     exec(`python3 ${scriptPath}`, (err, stdout, stderr) => {
//         if (err) {
//             console.error(err);
//             res.json({ success: false });
//         } else {
//             res.json({ success: true });
//         }
//     });
// });

app.listen(5000, '0.0.0.0', () => console.log('Server is running on port 5000'));
