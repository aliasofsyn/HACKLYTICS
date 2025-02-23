
// server.js

const axios = require('axios');
const fs = require('fs'); // Import the fs module
const express = require('express');
const http = require('http'); 
const app = express();
const cors = require('cors');
const { initializeWebSocket } = require('./websocket.js')
require('dotenv').config();
const port = process.env.PORT || 3001;


// Middleware to parse JSON bodies in requests
app.use(express.json());
app.use(cors());

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

//handles the data from the flight info form
app.post("/api/flightInfo", (req, res) => {

  try {
    const formData = req.body;
  
    // Convert data to a string that can be written into a JS file
    const fileContent = `const formData = ${JSON.stringify(formData, null, 2)};\n\nmodule.exports = formData;`;

    // Save data to a .js file
    fs.writeFile("formData.js", fileContent, (err) => {
      if (err) {
        console.error("Error saving data:", err);
        return res.status(500).json({ message: "Error saving data" });
      }
      console.log("Form data saved successfully!");
      res.json({ message: "Form data saved!" });
    })
  }  catch (error) {
    console.error("Error processing form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


  
  

const server = http.createServer(app)

initializeWebSocket(server);
console.log("used it");

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
