import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./user_dashboard.css";
import MyOrder from './myorder';   // first myorderwork use for the work adding

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="customer-dashboard">
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
                {/* Register Dropdown */}
                <div className="dropdown">
                  <button className="dropbtn">Register</button>
                  <div className="dropdown-content">
                    <Link to="/register">Register Farmer</Link>
                    <Link to="/register_vehicle">Register Vehicle</Link>
                   {/* <Link to="/register_emp">Register Admin</Link> */}      {/*  I have to remove this because it is employee registration page */}
      
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
      
      
      <br></br>
    
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">Work Assignment Dashboard</div>
        <button className="profile-button" onClick={() => navigate('/profile')}>
          <span className="bi bi-person-fill"></span> Profile
        </button>
      </div>
      
      <MyOrder />
    </div>
  );
}
