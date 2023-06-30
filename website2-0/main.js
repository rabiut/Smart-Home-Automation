const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');  // Require cors middleware

const app = express();
const server = http.createServer(app);

// Allow CORS for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow all origins
    methods: ["GET", "POST"]
  }
});

app.use(cors());  // Use cors middleware

// to support JSON-encoded bodies
app.use(express.json());

app.post('/api/detection', (req, res) => {
  console.log('Detection received:', req.body);
  const detection = req.body;

  if (detection.type === 'person') {
    console.log("Person detected!");

    // Get current date and time
    let now = new Date();

    let month = now.getMonth() + 1; // Months are zero-indexed in JavaScript
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Pad single digit numbers with a leading zero
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let formattedTime = `${month}:${day}:${hours}:${minutes}`;

    // Emit a real-time event with the current time
    io.emit('person_detected', { time: formattedTime });
  }
  
  res.send('Detection received');
});

server.listen(3000, () => console.log('Server listening on port 3000')); // Use server.listen instead of app.listen
// http://192.168.2.43:3000/api/detection
