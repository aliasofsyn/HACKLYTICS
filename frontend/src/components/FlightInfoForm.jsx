/* 
The form has two options for finding a flight:
1. **Flight Number**: Enter a flight number.
2. **Time, Current Airport Code, and Destination Airport Code**: Enter all three fields together.

**Error Handling:**
- If the user enters a flight number, the other fields are disabled.
- If the user enters time, current airport code, or destination airport code, the flight number field is disabled.
- Both airport codes must be exactly three letters.
- Form requires either a valid flight number or all three other fields filled.
*/

import { useState, useEffect } from "react";
import axios from 'axios';
import cors from 'cors';
import "../styles.css";

function FlightInfoForm() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightTime, setFlightTime] = useState("");
  const [currentAirportCode, setCurrentAirportCode] = useState("");
  const [destinationAirportCode, setDestinationAirportCode] = useState("");
  const [errors, setErrors] = useState({});

  const isFlightNumberMode = flightNumber.trim() !== "";
  const isSecondOptionMode =
    flightTime !== "" && currentAirportCode.trim() !== "" && destinationAirportCode.trim() !== "";

  const validateForm = () => {
    const newErrors = {};

    if (!isFlightNumberMode && !isSecondOptionMode) {
      newErrors.general = "Please enter either a flight number or fill in time, current airport code, and destination airport code.";
    }

    if (!isFlightNumberMode) {
      if (currentAirportCode.trim() && !/^[a-zA-Z]{3}$/.test(currentAirportCode)) {
        newErrors.currentAirportCode = "Current airport code must be exactly 3 letters.";
      }
      if (destinationAirportCode.trim() && !/^[a-zA-Z]{3}$/.test(destinationAirportCode)) {
        newErrors.destinationAirportCode = "Destination airport code must be exactly 3 letters.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted:", { flightNumber, flightTime, currentAirportCode, destinationAirportCode });
      // TODO: Connect to backend API or handle submission logic

      try {
        const formData = {"flightNumber": flightNumber, "flightTime": flightTime, "currentAirportCode": currentAirportCode, "destinationAirportCode": destinationAirportCode};
        await axios.post("http://localhost:3001/api/flightInfo", formData, {
          headers: { "Content-Type": "application/json" },
        });
  
        alert("Form submitted and saved!");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form.");
      }
    }
  };

  // Disable fields based on mode selection
  useEffect(() => {
    if (isFlightNumberMode) {
      setFlightTime("");
      setCurrentAirportCode("");
      setDestinationAirportCode("");
    }
  }, [flightNumber]);

  useEffect(() => {
    if (flightTime || currentAirportCode || destinationAirportCode) {
      setFlightNumber("");
    }
  }, [flightTime, currentAirportCode, destinationAirportCode]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Find Your Flight</h2>

        {errors.general && <p className="error">{errors.general}</p>}

        {/* Flight Number Input */}
        <div className="input-group">
          <label htmlFor="flightNumber">Flight Number</label>
          <input
            type="text"
            id="flightNumber"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="e.g., AA123"
            disabled={flightTime || currentAirportCode || destinationAirportCode}
          />
        </div>

        {/* Time Input */}
        <div className="input-group">
          <label htmlFor="flightTime">Time of Flight</label>
          <input
            type="time"
            id="flightTime"
            value={flightTime}
            onChange={(e) => setFlightTime(e.target.value)}
            disabled={isFlightNumberMode}
          />
        </div>

        {/* Current Airport Code Input */}
        <div className="input-group">
          <label htmlFor="currentAirportCode">Current Airport Code</label>
          <input
            type="text"
            id="currentAirportCode"
            value={currentAirportCode}
            onChange={(e) => setCurrentAirportCode(e.target.value.toUpperCase())}
            placeholder="e.g., ATL"
            maxLength={3}
            disabled={isFlightNumberMode}
          />
          {errors.currentAirportCode && <p className="error">{errors.currentAirportCode}</p>}
        </div>

        {/* Destination Airport Code Input */}
        <div className="input-group">
          <label htmlFor="destinationAirportCode">Destination Airport Code</label>
          <input
            type="text"
            id="destinationAirportCode"
            value={destinationAirportCode}
            onChange={(e) => setDestinationAirportCode(e.target.value.toUpperCase())}
            placeholder="e.g., JFK"
            maxLength={3}
            disabled={isFlightNumberMode}
          />
          {errors.destinationAirportCode && <p className="error">{errors.destinationAirportCode}</p>}
        </div>

        <button type="submit" className="button">Search Flight</button>
      </form>
    </div>
  );
}

export default FlightInfoForm;
