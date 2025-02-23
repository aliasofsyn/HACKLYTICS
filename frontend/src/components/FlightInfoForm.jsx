/* 
The form has two options for finding a flight:
1. **Flight Number**: Enter a flight number.
2. **Time, Destination, and Airport Code**: Enter all three fields together.

**Error Handling:**
- If the user enters a flight number, the other fields are disabled.
- If the user enters time, destination, or airport code, the flight number field is disabled.
- Airport code must be exactly three letters.
- Form requires either a valid flight number or all three other fields filled.
*/

import { useState, useEffect } from "react";
import "../styles.css";

function FlightInfoForm() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightTime, setFlightTime] = useState("");
  const [destination, setDestination] = useState("");
  const [airportCode, setAirportCode] = useState("");
  const [errors, setErrors] = useState({});

  const isFlightNumberMode = flightNumber.trim() !== "";
  const isSecondOptionMode = flightTime !== "" && destination.trim() !== "" && airportCode.trim() !== "";

  const validateForm = () => {
    const newErrors = {};

    if (!isFlightNumberMode && !isSecondOptionMode) {
      newErrors.general = "Please enter either a flight number or fill in time, destination, and airport code.";
    }

    if (!isFlightNumberMode && airportCode.trim() && !/^[a-zA-Z]{3}$/.test(airportCode)) {
      newErrors.airportCode = "Airport code must be exactly 3 letters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted:", { flightNumber, flightTime, destination, airportCode });
      // TODO: Connect to backend API or handle submission logic
    }
  };

  // Disable fields based on mode selection
  useEffect(() => {
    if (isFlightNumberMode) {
      setFlightTime("");
      setDestination("");
      setAirportCode("");
    }
  }, [flightNumber]);

  useEffect(() => {
    if (flightTime || destination || airportCode) {
      setFlightNumber("");
    }
  }, [flightTime, destination, airportCode]);

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
            disabled={flightTime || destination || airportCode}
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

        {/* Destination Input */}
        <div className="input-group">
          <label htmlFor="destination">Destination City</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., New York"
            disabled={isFlightNumberMode}
          />
        </div>

        {/* Airport Code Input */}
        <div className="input-group">
          <label htmlFor="airportCode">Airport Code</label>
          <input
            type="text"
            id="airportCode"
            value={airportCode}
            onChange={(e) => setAirportCode(e.target.value.toUpperCase())}
            placeholder="e.g., JFK"
            maxLength={3}
            disabled={isFlightNumberMode}
          />
          {errors.airportCode && <p className="error">{errors.airportCode}</p>}
        </div>

        <button type="submit" className="button">Search Flight</button>
      </form>
    </div>
  );
}

export default FlightInfoForm;
