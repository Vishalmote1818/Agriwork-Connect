import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./about_us.css";

export default function AboutUs() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-text">AGRIWORK CONNECT</div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
          <li><Link to="/allocation_dashboard">Work Allocation</Link></li>
        </ul>

        <div className="navbar-right">
          {/* Register Button */}
          <div className="dropdown">
            <button className="dropbtn">Register</button>
            <div className="dropdown-content">
              <Link to="/register">Register Farmer</Link>
              <Link to="/register_vehicle">Register Vehicle</Link>
            </div>
          </div>

          {/* Login Button */}
          <div className="dropdown">
            <button className="dropbtn">
              <Link to="/login" className="login-link" style={{ textDecoration: "none", color: "black" }}>
                Login
              </Link>
            </button>
          </div>
        </div>
      </nav>

      {/* About Us Content */}
      <div className="about-container">
        <h1>About <span className="highlight">Agriwork Connect</span></h1>
        <p className="tagline">Smart Labour Hiring System for Farmers</p>
        
        <div className="content">
          <p>
            AgriWork Connect is an advanced labor hiring platform designed to streamline 
            farm workforce management. We connect farmers, laborers, and vehicle drivers 
            for efficient and hassle-free agricultural work allocation.
          </p>
          <p>
            Our mission is to revolutionize the agricultural labor market with technology-driven 
            solutions, ensuring seamless hiring, fair wages, and optimized resource utilization.
          </p>
        </div>

        {/* Social Media Links */}
        <h2>Follow Us</h2>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
      </div>
    </>
  );
}
