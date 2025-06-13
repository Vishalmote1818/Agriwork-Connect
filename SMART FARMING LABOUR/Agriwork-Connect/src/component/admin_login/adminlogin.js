import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./adminlogin.css";

export default function AdminLogin() {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const [errors, setErrors] = useState({});
   const [submitted, setSubmitted] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const validateForm = () => {
      const newErrors = {};
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
         setSubmitted(true);
         console.log("Form submitted", formData);
         navigate("/admin_dashboard");   // here for work change it as the vehicle_adminDashboard
      }
   };

   return (
      <div>
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
                      <Link to="/register">Register User</Link>
                      <Link to="/register_vehicle">Register Vehicle</Link>
                     {/* <Link to="/register_emp">Register Admin</Link> */}      {/*  I have to remove this because it is employee registration page */}
        
                    </div>
                  </div>
                  
                  {/* Login Dropdown */}
                  <div className="dropdown">
                    <button className="dropbtn">Login</button>
                    <div className="dropdown-content">
                      <Link to="/login">User Login</Link>
                      <Link to="/admin_login">Admin Login</Link>
                      <Link to="/login_vehicle">Vehicle Login</Link>   
                      <Link to="/login_emp">Admin Work Allocate</Link>   
        
                    </div>
                  </div>
                </div>
              </nav>
        

         {/* Admin Login Form */}
         <div className="admin-login-page">
            <h2>Admin Login</h2>
            {submitted ? (
               <div className="thank-you-message">
                  <h3>Login Successful!</h3>
                  <p>Redirecting to admin dashboard...</p>
               </div>
            ) : (
               <form className="login-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                     <label>Email:</label>
                     <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                     />
                     {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                     <label>Password:</label>
                     <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                     />
                     {errors.password && <span className="error">{errors.password}</span>}
                  </div>
                  {errors.api && <span className="error">{errors.api}</span>}
                  <button type="submit" className="submit-button">
                     Login
                  </button>
               </form>
            )}
         </div>
      </div>
   );
}
