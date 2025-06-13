import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-item">
          <span className="label">Name:</span>
          <span className="value">{user.firstName} {user.lastName}</span>
        </div>
        <div className="profile-item">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>
        <div className="profile-item">
          <span className="label">Phone Number:</span>
          <span className="value">{user.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}
