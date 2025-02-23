// Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './FlightInfoForm';
import SearchOptionsPage from './SearchOptionsPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search-options" element={<SearchOptionsPage />} />
      </Routes>
    </Router>
  );
}