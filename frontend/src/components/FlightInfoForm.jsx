/* 
The form has two options for finding a flight: by flight number or by time and destination. The user can enter a flight number
in the first option, or a time and destination in the second option. The form will display an error message if the user tries 
to submit the form without entering any information.
*/

import { useState } from "react";
import { Search } from "lucide-react";

function FlightInfoForm() {
    // The useState hook is used to create state variables in functional components.
  const [flightNumber, setFlightNumber] = useState("");
  const [flightTime, setFlightTime] = useState("");
  const [destination, setDestination] = useState("");
  const [errors, setErrors] = useState({});

  const isFlightNumberMode = flightNumber.trim() !== "";
  const isTimeAndDestinationMode = flightTime !== "" || destination.trim() !== "";

  // The validateForm function checks if the form is valid and sets the errors state variable accordingly.
  const validateForm = () => {
    const newErrors = {};

    if (!isFlightNumberMode && !isTimeAndDestinationMode) {
      newErrors.general = "Please enter either a flight number or both time and destination.";
    }

    if (isFlightNumberMode && !flightNumber.trim()) {
      newErrors.flightNumber = "Flight number is required.";
    }

    if (isTimeAndDestinationMode) {
      if (!flightTime) newErrors.flightTime = "Flight time is required.";
      if (!destination.trim()) newErrors.destination = "Destination city is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // The handleSubmit function is called when the form is submitted. It validates the form and logs the form data if it is valid.
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Submitted:", { flightNumber, flightTime, destination });
      // TODO: Connect to backend API or handle submission logic
    }
  };

  const handleFlightNumberChange = (e) => {
    setFlightNumber(e.target.value);
    if (e.target.value.trim() !== "") {
      setFlightTime("");
      setDestination("");
    }
  };

  const handleTimeOrDestinationChange = (setter) => (e) => {
    setter(e.target.value);
    if (e.target.value.trim() !== "") {
      setFlightNumber("");
    }
  };
  return (
    <div className="min-h-screen bg-red-500">
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-white border-4 border-white rounded-lg shadow-md p-6"
        >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Find Your Flight
        </h2>

        {errors.general && (
          <p className="text-red-500 text-center text-sm mb-4">{errors.general}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flight Number Option */}
          <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 text-center">Option 1: Flight Number</h3>
            <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Flight Number
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="flightNumber"
                value={flightNumber}
                onChange={handleFlightNumberChange}
                placeholder="e.g., AA123"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTimeAndDestinationMode}
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Submit Flight Number"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            {errors.flightNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.flightNumber}</p>
            )}
          </div>

          {/* Time and Destination Option */}
          <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 text-center">Option 2: Time & Destination</h3>

            <div className="mb-4">
              <label htmlFor="flightTime" className="block text-sm font-medium text-gray-700 mb-1">
                Time of Flight
              </label>
              <input
                type="time"
                id="flightTime"
                value={flightTime}
                onChange={handleTimeOrDestinationChange(setFlightTime)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isFlightNumberMode}
              />
              {errors.flightTime && (
                <p className="text-red-500 text-sm mt-1">{errors.flightTime}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destination City
              </label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={handleTimeOrDestinationChange(setDestination)}
                placeholder="e.g., New York"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isFlightNumberMode}
              />
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Submit Time and Destination"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FlightInfoForm;
