import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../service/api_service';
import './register_emp.css';

export default function EmployeeRegister() {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [routeName, setRouteName] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleRegister = async (e) => {
       e.preventDefault();
       setError('');  // Reset errors before new submission
       
       if (!firstName || !lastName || !email || !password || !phoneNumber || !routeName) {
           setError('All fields are required.');
           return;
       }

       setLoading(true);
       try {
           const response = await apiClient.post('/api/employees/register', {
               firstName,
               lastName,
               email,
               password,
               phoneNumber,
               routeName
           });

           if (response.status === 200) {
               console.log('Employee Registration successful:', response.data);
               localStorage.setItem('employee', JSON.stringify(response.data));
               navigate('/employee-dashboard');         /// Here have to change from the employee-dashboard to any other page
           } else {
               setError('Registration failed. Please try again.');
           }
       } 
       
       catch (error) {
        console.error('Registration failed:', error);
     
        if (error.response) {
            if (error.response.status === 400) {
                setError(error.response.data); // Displays "Email already exists."
            } else if (error.response.status === 500) {
                setError('Server error. Please try again later.');
            } else {
                setError(error.response.data?.message || 'Registration failed. Please check your details.');
            }
        } else {
            setError('Network error. Please check your connection.');
        }
     }
      
     finally {
           setLoading(false);
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
            
            <br/><br/><br/><br/><br/>

            {/* Registration Form */}
            <div id="form-container" className="container-fluid">
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-circle"></div>
                    </div>
                )}
                <form onSubmit={handleRegister}>
                    <h2> <span className="bi bi-person-fill"></span> Employee Register</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-2">
                        <label className="form-label">First Name</label>
                        <input type="text" placeholder="First Name" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Last Name</label>
                        <input type="text" placeholder="Last Name" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Email Address</label>
                        <input type="email" placeholder="example@gmail.com" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Password</label>
                        <input type="password" placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Phone Number</label>
                        <input type="number" placeholder="1234567890" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Route Name</label>
                        <input type="text" placeholder="Enter Route Name" className="form-control" value={routeName} onChange={(e) => setRouteName(e.target.value)} required />
                    </div>
                    <div className="mb-2"> 
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
