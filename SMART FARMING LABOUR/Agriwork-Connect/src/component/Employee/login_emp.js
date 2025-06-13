import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login_emp.css';
import apiClient from '../../service/api_service';

export default function EmployeeLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/api/employees/login', {
                email,
                password,
            });
            const employeeData = response.data;
            console.log('Employee Login successful:', employeeData);
            localStorage.setItem('employee', JSON.stringify(employeeData));
            navigate('/vehicle_adminDashboard');        // here we have to change somathjing else accordin to need
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again.');
        }
    };

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
            
            
            {/* Login Form */}
            <div id="form-container" className="container-fluid">
                <form onSubmit={handleLogin}>
                    <h2> <span className="bi bi-person-fill"></span> Employee Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-2">
                        <label className="form-label">Email Address</label>
                        <div>
                            <input type="text" placeholder="Email Address" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Password</label>
                        <div>
                            <input type="password" placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-2"> 
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}
