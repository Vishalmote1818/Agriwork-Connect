import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../service/api_service';
import './register.css';

export default function Register() {

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        setError('All fields are required.');
        return;
    }
    setLoading(true);
    try {
        const response = await apiClient.post('/api/users/register', {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
        });

        if (response.status === 200) {
            const userData = response.data;
            console.log('Registration successful:', userData);
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/user-dashboard');
        } else {
            setError('Failed to register. Please try again.');
        }
    } catch (error) {
        console.error('Registration failed:', error);
        setError('Registration failed. Please try again.');
    } finally {
        setLoading(false);
    }
};


    return(
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
          
            <br/>
            {/* Registration Form */}
            <div id="form-container" className="container-fluid">
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-circle"></div>
                    </div>
                )}
                <form onSubmit={handleRegister}>
                    <h2> <span className="bi bi-person-fill"></span> Register</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-2">
                        <label className="form-label">First Name</label>
                        <input type="text" placeholder="First Name" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Last Name</label>
                        <input type="text" placeholder="Last Name" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Email Address</label>
                        <input type="email" placeholder="example@gmail.com" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Password</label>
                        <input type="password" placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Phone Number</label>
                        <input type="number" placeholder="1234567890" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <div className="mb-2"> 
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>Register</button>
                    </div>
                </form>
            </div>
        </>
    );
}
