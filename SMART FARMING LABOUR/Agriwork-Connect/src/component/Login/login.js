import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let dashboard = '';

            if (role === 'user') {
                dashboard = '/user-dashboard';
            } else if (role === 'vehicle') {
                dashboard = '/vehicle_dashboard';
            } else if (role === 'employee') {
                dashboard = '/vehicle_adminDashboard';
            } else if (role === 'admin') {
                // Hardcoded admin credentials
                if (email === 'vishal@gmail.com' && password === '1818') {
                    console.log('Admin login successful');
                    navigate('/admin_dashboard');
                    return;
                } else {
                    setError('Invalid admin credentials.');
                    return;
                }
            } else {
                setError('Invalid role selected.');
                return;
            }

            console.log(`${role} login successful`);
            navigate(dashboard);
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo-text">AGRIWORK CONNECT</div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/contactus">Contact Us</Link></li>
                    <li><Link to="/allocation_dashboard">Work Allocation</Link></li>
                </ul>
                <div className="navbar-right">
                    <div className="dropdown">
                        <button className="dropbtn">Register</button>
                        <div className="dropdown-content">
                            <Link to="/register">Register Farmer</Link>
                            <Link to="/register_vehicle">Register Vehicle</Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">
                                       <Link to="/login" className="login-link" style={{ textDecoration: "none", color: "black" }}>
                                            Login
                                       </Link>
                                  </button>

                        {/* <button className="dropbtn">Login</button>
                        <div className="dropdown-content">
                            <Link to="/login">User Login</Link>
                            <Link to="/admin_login">Admin Login</Link>
                            <Link to="/login_vehicle">Vehicle Login</Link>
                            <Link to="/login_emp">Work Allocate Login</Link>
                        </div> */}


                    </div>
                </div>
            </nav> 

            <div id="form-container" className="container-fluid">
                <form onSubmit={handleLogin}>
                    <h2><span className="bi bi-person-fill"></span> Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-2">
                        <label className="form-label">Login As</label>
                        <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="vehicle">Vehicle</option>
                            {/* <option value="employee">Admin Work Allocate</option> */}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Email Address</label>
                        <input 
                            type="text" 
                            placeholder="Email Address" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="mb-2">
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}
