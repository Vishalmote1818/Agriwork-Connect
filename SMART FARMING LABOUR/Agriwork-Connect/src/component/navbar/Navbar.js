import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure styling is linked

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-text">Microtech</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/contactus">Contact Us</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>

      {/* Login Dropdown */}
      <div className="dropdown">
        <button className="dropbtn">Login</button>
        <div className="dropdown-content">
          <Link to="/login">User Login</Link>
          <Link to="/admin_login">Admin Login</Link>
        </div>
      </div>
    </nav>
  );
}
