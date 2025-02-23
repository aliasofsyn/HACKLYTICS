/* 
The form has two options for finding a flight: by flight number or by time and destination. The user can enter a flight number
in the first option, or a time and destination in the second option. The form will display an error message if the user tries 
to submit the form without entering any information.
*/

import { useState } from "react";
import "../styles.css";

function FlightInfoForm() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightTime, setFlightTime] = useState("");
  const [destination, setDestination] = useState("");
  const [errors, setErrors] = useState({});

  const isFlightNumberMode = flightNumber.trim() !== "";
  const isTimeAndDestinationMode = flightTime !== "" || destination.trim() !== "";

  const validateForm = () => {
    const newErrors = {};
    if (!isFlightNumberMode && !isTimeAndDestinationMode) {
      newErrors.general = "Please enter either a flight number or both time and destination.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted:", { flightNumber, flightTime, destination });
      // TODO: Connect to backend API or handle submission logic
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Find Your Flight</h2>

        {errors.general && <p className="error">{errors.general}</p>}

        <div className="input-group">
          <label htmlFor="flightNumber">Flight Number</label>
          <input
            type="text"
            id="flightNumber"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="e.g., AA123"
          />
        </div>

        <div className="input-group">
          <label htmlFor="flightTime">Time of Flight</label>
          <input
            type="time"
            id="flightTime"
            value={flightTime}
            onChange={(e) => setFlightTime(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="destination">Destination City</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., New York"
          />
        </div>

        <button type="submit" className="button">Search Flight</button>
      </form>
    </div>
  );
}

export default FlightInfoForm;
