
// server.js

const axios = require('axios');
const express = require('express');
const http = require('http'); 
const app = express();
const { initializeWebSocket } = require('./websocket.js')
console.log("imported it just fine");
require('dotenv').config();
const port = process.env.PORT || 3001;


// Middleware to parse JSON bodies in requests
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example of a more complex route returning JSON
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    status: 'success'
  });
});

const server = http.createServer(app)

initializeWebSocket(server);
console.log("used it");

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
