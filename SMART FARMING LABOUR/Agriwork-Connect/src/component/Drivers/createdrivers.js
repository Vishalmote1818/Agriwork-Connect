import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./createdrivers.css";
import apiClient from "../../service/api_service";

export default function CreateDriver() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    labourId: "",
    labourFirstName: "",
    labourLastName: "",
    address: "",
    phoneNo: "",
    experience: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const labourData = localStorage.getItem("labour");
    if (labourData) {
      const labour = JSON.parse(labourData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        labourId: labour.labourId,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.labourFirstName?.trim())
      newErrors.labourFirstName = "First Name is required";
    if (!formData.labourLastName?.trim())
      newErrors.labourLastName = "Last Name is required";
    if (!formData.address?.trim()) newErrors.address = "Address is required";
    if (!formData.phoneNo || !/^\d{10}$/.test(formData.phoneNo.trim()))
      newErrors.phoneNo = "Phone number must be a valid 10-digit number";
    if (!formData.experience?.trim())
      newErrors.experience = "Experience is required";
    if (!formData.gender?.trim()) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await apiClient.post("/createDriver1", JSON.stringify(formData), {
          headers: {
            "Content-Type": "application/json",
          },
        });

        alert("Driver created successfully!");
        navigate("/vehicle_dashboard");
      } catch (error) {
        console.error("Error creating driver:", error);
        const errorMsg = error.response?.data?.message || "Failed to create driver. Please try again.";
        setErrors({ api: errorMsg });
      }
    }
  };



  // const handleSubmit2 = async (e) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     try {
  //       const response = await apiClient.post("/createDriver2", JSON.stringify(formData), {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       alert("Driver created successfully!");
  //       navigate("/vehicle_dashboard");
  //     } catch (error) {
  //       console.error("Error creating driver:", error);
  //       const errorMsg = error.response?.data?.message || "Failed to create driver. Please try again.";
  //       setErrors({ api: errorMsg });
  //     }
  //   }
  // };






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
          {/* Register Dropdown */}
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

      <div className="parcel-modal">
        <h2 className="parcel-details-text">Labour Details</h2>
        <form className="create-parcel-form" onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col">
              <label>First Name:</label>
              <input type="text" name="labourFirstName" value={formData.labourFirstName} onChange={handleChange} placeholder="Enter First name" />
              {errors.labourFirstName && <span className="error">{errors.labourFirstName}</span>}
            </div>
            <div className="col">
              <label>Last Name:</label>
              <input type="text" name="labourLastName" value={formData.labourLastName} onChange={handleChange} placeholder="Enter Last name" />
              {errors.labourLastName && <span className="error">{errors.labourLastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          
          <div className="col">
            <label>Phone No:</label>
            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Enter phone number" />
            {errors.phoneNo && <span className="error">{errors.phoneNo}</span>}
          </div>

          <div className="col">
            <label>Experience:</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Enter work Experience" />
            {errors.experience && <span className="error">{errors.experience}</span>}
          </div>

          <div className="col">
            <label>Gender:</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Enter Gender" />
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <br />

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>




{/* 
      <div className="parcel-modal">
        <h2 className="parcel-details-text">Labour Details</h2>
        <form className="create-parcel-form" onSubmit={handleSubmit2}>
          <div className="form-group row">
            <div className="col">
              <label>First Name:</label>
              <input type="text" name="labourFirstName" value={formData.labourFirstName} onChange={handleChange} placeholder="Enter First name" />
              {errors.labourFirstName && <span className="error">{errors.labourFirstName}</span>}
            </div>
            <div className="col">
              <label>Last Name:</label>
              <input type="text" name="labourLastName" value={formData.labourLastName} onChange={handleChange} placeholder="Enter Last name" />
              {errors.labourLastName && <span className="error">{errors.labourLastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          
          <div className="col">
            <label>Phone No:</label>
            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Enter phone number" />
            {errors.phoneNo && <span className="error">{errors.phoneNo}</span>}
          </div>

          <div className="col">
            <label>Experience:</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Enter work Experience" />
            {errors.experience && <span className="error">{errors.experience}</span>}
          </div>

          <div className="col">
            <label>Gender:</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Enter Gender" />
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <br />

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div> */}






    </div>
  );
}
