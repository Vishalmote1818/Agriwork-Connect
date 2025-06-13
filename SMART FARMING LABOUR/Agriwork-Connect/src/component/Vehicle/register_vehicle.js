import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../service/api_service';
import './register_vehicle.css';

export default function VehicleRegister() {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [vehicleNo, setVehicleNo] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password || !phoneNumber || !vehicleNo) {
        setError('All fields are required.');
        return;
    }

    setLoading(true);
    try {
        const response = await apiClient.post('/api/vehicles/register', {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            vehicleNo,
        });

        console.log('API Response:', response);  // Debugging

        if (response.status === 200 || response.status === 201) {
            console.log('Vehicle Registration successful:', response.data);
            sessionStorage.setItem('vehicleData', JSON.stringify(response.data));

            setTimeout(() => {
                navigate('/vehicle_dashboard');
            }, 1000);
        } else {
            setError('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration failed:', error);
        if (error.response) {
            setError(error.response.data?.message || 'Registration failed. Please check your details.');
        } else {
            setError('Network error. Please check your connection.');
        }
    } finally {
        setLoading(false);
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
                         <Link to="/register">Register User</Link>
                         <Link to="/register_vehicle">Register Vehicle</Link>
                       </div>
                     </div>
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
           
           <br/><br/><br/><br/>

           <div id="form-container" className="container-fluid">
               {loading && (
                   <div className="loading-overlay">
                       <div className="loading-circle"></div>
                   </div>
               )}
               <form onSubmit={handleRegister}>
                   <h2><span className="bi bi-truck"></span> Vehicle Register</h2>
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
                       <label className="form-label">Vehicle  No</label>
                       <input type="text" placeholder="Enter Vehicle No" className="form-control" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} required />
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
