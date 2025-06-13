import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./vehicle_dashboard.css";
import MyDriverOrder from "./mydriverorder";

export default function VehicleDashboard() {
  const navigate = useNavigate();
  const [refreshOrders, setRefreshOrders] = useState(false);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    // Retrieve vehicle session data
    const storedVehicle = JSON.parse(sessionStorage.getItem("vehicleData"));

    if (!storedVehicle) {
      // Redirect to login if no session found
      navigate("/login");
    } else {
      setVehicle(storedVehicle);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("vehicleData"); // Clear session
    navigate("/login"); // Redirect to login
  };

  const handleDataAdded = () => {
    setRefreshOrders((prev) => !prev);
  };

  
  return (
    <div className="customer-dashboard">
      <nav className="navbar">
        <div className="logo-text">AGRIWORK CONNECT</div>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link to="/contactus">Contact Us</Link>
          </li>
          <li>
            <Link to="/allocation_dashboard">Work Allocation</Link>
          </li>
        </ul>

        <div className="navbar-right">
          {/* Display Vehicle Info */}
          {vehicle && <span className="vehicle-info">Welcome, {vehicle.name}</span>}

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <br />

      <div className="dashboard-header">
        <div className="dashboard-title">All Drivers Dashboard</div>
        <button className="profile-button" onClick={() => navigate("/profile")}>
          <span className="bi bi-person-fill"></span> Profile
        </button>
      </div>

      {/* ✅ Pass refreshOrders as a key to force re-render */}
      <MyDriverOrder key={refreshOrders} />
    </div>
  );
}
