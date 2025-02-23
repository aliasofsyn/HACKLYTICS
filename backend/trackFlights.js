const axios = require('axios');
const cors = require('cors');
const formData = require("./formData.js");

const fetchData = async () => {
    try {
        
        const response = await axios.get("https://aviation-edge.com/v2/public/routes?key=" + (process.env.AVIATION_KEY || '41c972-6c8bdd') + "&departureIata="+ formData.currentAirportCode +"&arrivalIata=" + formData.destinationAirportCode);
        console.log("Data:", response.data);
        response.filter(flight => flight.departureTime != null && flight.departureTime );
        var currentTime = new Date();
        currTime_formatted = `${currentTime.getHours() < 10 ? '0' + currentTime.getHours() : currentTime.getHours()}:${currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes()}:${currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds()}`
        const cleaned_response = response.filter(flight => flight["departureTime"] != null && flight["departureTime"] > currTime_formatted);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  fetchData();
