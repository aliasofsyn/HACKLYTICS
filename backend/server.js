
// server.js

const axios = require('axios');
const express = require('express'); 
const app = express();
const { initWebSocket } = require('./websocket')
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


initWebSocket(8000);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
