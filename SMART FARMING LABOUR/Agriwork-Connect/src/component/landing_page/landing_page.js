import React from "react";
import { Link } from "react-router-dom";
import "./landing_page.css";

export default function LandingPage() {
  return (
    <div className="page-container">
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

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>AGRIWORK CONNECT</h1>
          <p>SMART LABOUR HIRING SYSTEM FOR FARMERS</p>
          
        </div>
        <div className="hero-image">
         
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Easy Hiring"
            />
            <h3>Easy Hiring</h3>
            <p>Quick and efficient labor hiring process.</p>
          </div>
          <div className="feature">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Verified Workers"
            />
            <h3>Skilled Workers</h3>
            <p>All workers are Skilled in various work.</p>
          </div>
          <div className="feature">
            <img
              src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="24/7 Support"
            />
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section
      <div className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Register"
            />
            <h3>1. Register</h3>
            <p>Create an account to get started.</p>
          </div>
          <div className="step">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Register"
            />
            <h3>2. Post a Job</h3>
            <p>Describe the job you need help with.</p>
          </div>
          <div className="step">
            <img
              src="https://images.unsplash.com/photo-1556742045-e6e4b6b8b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Register"
            />
            <h3>3. Hire Workers</h3>
            <p>Choose from a list of available workers.</p>
          </div>








{/* 
          <div className="step">
            <img
              src="https://images.unsplash.com/photo-0cfed4f6a45d-3f52b6d4fd1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Post a Job"
            />
            <h3>2. Post a Job</h3>
            <p>Describe the job you need help with.</p>
          </div>
          <div className="step">
            <img
              src="https://images.unsplash.com/photo-1556742044-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Hire Workers"
            />
            <h3>3. Hire Workers</h3>
            <p>Choose from a list of available workers.</p>
          </div> */}






{/* 
        </div>
      </div> */} 

      {/* Testimonials Section */}
      {/* <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="John Doe"
            />
            <p>"Agriwork Connect made hiring labor so easy!"</p>
            <h3>- John Doe</h3>
          </div>
          <div className="testimonial">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Jane Smith"
            />
            <p>"Great platform for farmers and workers alike."</p>
            <h3>- Jane Smith</h3>
          </div>
        </div>
      </div> */}



 {/* Footer */}
<footer className="footer">
  <div className="footer-content">
    {/* Quick Links */}
    <div className="footer-links">
      <Link to="/">Home</Link>
      <Link to="/aboutus">About Us</Link>
      <Link to="/contactus">Contact Us</Link>
      <Link to="/allocation_dashboard">Work Allocation</Link>
    </div>

    {/* Social Media Icons */}
    <div className="social-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="footer-bottom">
    <p>&copy; 2023 Agriwork Connect. All rights reserved.</p>
  </div>
</footer>
</div>
  );
}