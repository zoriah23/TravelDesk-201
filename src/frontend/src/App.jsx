import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserDashboard from "./pages/User/Dashboard";
import AdminDashBoard from "./pages/AdminPages/Dashboard";
import FlightPage from "./pages/User/Flight";
import HotelPage from "./pages/User/Hotel";
import ActivityPage from "./pages/User/Activity";
import Flights from "./components/Services/Flight/User/Flights";
import Hotels from "./components/Services/Hotel/User/Hotels";
import Activities from "./components/Services/Activities/User/Activities";
import ActivityList from "./components/Services/Activities/Admin/List";
import HotelList from "./components/Services/Hotel/Admin/List";
import FlightsList from "./components/Services/Flight/Admin/List";
import Ticket from "./components/Services/Flight/User/Ticket";

const App = function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/flightInfo" element={<FlightPage />} />
        <Route path="/hotelInfo" element={<HotelPage />} />
        <Route path="/activityInfo" element={<ActivityPage />} />
        <Route path="/activityDetails" element={<ActivityList />} />
        <Route path="/hotelDetails" element={<HotelList />} />
        <Route path="/flightDetails" element={<FlightsList />} />
        <Route path="/confirmation" element={<Ticket />} />

      </Routes>
    </Router>
  );
};

export default App;
