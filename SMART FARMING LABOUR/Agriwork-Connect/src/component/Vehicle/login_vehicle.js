import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login_vehicle.css';
import apiClient from '../../service/api_service';

export default function VehicleLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkSession() {
            try {
                const response = await apiClient.get('/vehicles/session');
                if (response.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        }
        checkSession();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = { email, password };
            const response = await apiClient.post("/api/vehicles/login", loginData);
            
            if (response.status === 200) {
                sessionStorage.setItem("vehicleData", JSON.stringify(loginData));
                alert("Login successful");
                navigate("/vehicle_dashboard");
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await apiClient.post('/vehicles/logout');
            setIsLoggedIn(false);
            sessionStorage.removeItem("vehicleData");
            navigate('/login_vehicle');
        } catch (error) {
            console.error('Logout failed:', error);
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
                    {isLoggedIn ? (
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login_vehicle" className="btn btn-primary">Login</Link>
                    )}
                </div>
            </nav>

            {!isLoggedIn && (
                <div id="form-container" className="container-fluid">
                    <form onSubmit={handleLogin}>
                        <h2><span className="bi bi-truck"></span> Vehicle Login</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
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
            )}
        </>
    );
}
