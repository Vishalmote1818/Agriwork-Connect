import React, { useState, useEffect } from "react";
import "./creatework.css";
import apiClient from "../../service/api_service";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added Link import

export default function CreateParcel() {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      userId: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      workAddress: "",
      workDay: "",
      workDate: "",
      workTime: "",
      noOfWorkers: "",
      workType: "",
      workerGender: "",
   });

   const [errors, setErrors] = useState({});
   const [successMessage, setSuccessMessage] = useState("");

   useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
         const user = JSON.parse(userData);
         setFormData((prevFormData) => ({
            ...prevFormData,
            userId: user.userId,
         }));
      }
   }, []);

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
         ...formData,
         [name]: type === "checkbox" ? checked : value,
      });
   };

   const validateForm = () => {
      const newErrors = {};
      if (!formData.firstName) newErrors.firstName = "First Name is required";
      if (!formData.lastName) newErrors.lastName = "Last Name is required";
      if (!formData.workAddress) newErrors.workAddress = "Work Address is required";
      if (!formData.workDay) newErrors.workDay = "Work Day is required";
      if (!formData.workDate) newErrors.workDate = "Work Date is required";
      if (!formData.workTime) newErrors.workTime = "Work Time is required";
      if (!formData.phoneNo || !/^\d{10}$/.test(formData.phoneNo))
         newErrors.phoneNo = "Phone number must be a valid 10-digit number";
      if (!formData.noOfWorkers || isNaN(formData.noOfWorkers))
         newErrors.noOfWorkers = "Workers must be a valid number";
      if (!formData.workType) newErrors.workType = "Work Type is required";
      if (!formData.workerGender) newErrors.workerGender = "Worker Gender is required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (validateForm()) {
          try {
              const response = await apiClient.post("/createWork", JSON.stringify(formData), {
                  headers: {
                      "Content-Type": "application/json",
                  },
              });
  
              alert("✅ Work submitted successfully!");
              navigate("/user-dashboard");
          } catch (error) {
              console.error("Failed to create work:", error);
              const errorMsg = error.response?.data?.message || "Failed to create work. Please try again.";
              setErrors({ api: errorMsg });
          }
      }
  };
  


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
            <div className="dropdown">
               <button className="dropbtn">Register</button>
               <div className="dropdown-content">
                  <Link to="/register">Register Farmer</Link>
                  <Link to="/register_vehicle">Register Vehicle</Link>
               </div>
            </div>
            <div className="dropdown">
               <button className="dropbtn">
                  <Link to="/login" className="login-link" style={{ textDecoration: "none", color: "black" }}>Login</Link>
               </button>
            </div>
         </div>
      </nav>
      
      <div className="parcel-modal">

         
         <h2 className="parcel-details-text">Work Details</h2>

         {/* Display Success Message */}
         {successMessage && <p className="success-message">{successMessage}</p>}

         {/* Display API Error Message */}
         {errors.api && <p className="error">{errors.api}</p>}

         <form className="create-parcel-form" onSubmit={handleSubmit}>
            <div className="form-group row">
               <div className="col">
                  <label>First Name:</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First name" />
                  {errors.firstName && <span className="error">{errors.firstName}</span>}
               </div>
               <div className="col">
                  <label>Last Name:</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Last name" />
                  {errors.lastName && <span className="error">{errors.lastName}</span>}
               </div>
            </div>

            <div className="col">
               <label>Phone No:</label>
               <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Enter phone no:" />
               {errors.phoneNo && <span className="error">{errors.phoneNo}</span>}
            </div>

            <div className="form-group">
               <label>Work Address:</label>
               <textarea name="workAddress" value={formData.workAddress} onChange={handleChange} placeholder="Enter work address" />
               {errors.workAddress && <span className="error">{errors.workAddress}</span>}
            </div>

            <div className="col">
               <label>Work Day:</label>
               <input type="text" name="workDay" value={formData.workDay} onChange={handleChange} placeholder="Enter work day:" />
               {errors.workDay && <span className="error">{errors.workDay}</span>}
            </div>

            <div className="col">
               <label>Work Date:</label>
               <input type="date" name="workDate" value={formData.workDate} onChange={handleChange} />
               {errors.workDate && <span className="error">{errors.workDate}</span>}
            </div>

            <div className="col">
               <label>Work Time:</label>
               <input type="time" name="workTime" value={formData.workTime} onChange={handleChange} />
               {errors.workTime && <span className="error">{errors.workTime}</span>}
            </div>

            <div className="col">
               <label>No of Workers:</label>
               <input type="number" name="noOfWorkers" value={formData.noOfWorkers} onChange={handleChange} placeholder="Enter no of workers:" />
               {errors.noOfWorkers && <span className="error">{errors.noOfWorkers}</span>}
            </div>

            <div className="col">
               <label>Work Type:</label>
               <input type="text" name="workType" value={formData.workType} onChange={handleChange} placeholder="Enter work type:" />
               {errors.workType && <span className="error">{errors.workType}</span>}
            </div>

            <div className="col">
               <label>Worker Gender:</label>
               <select name="workerGender" value={formData.workerGender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Any">Any</option>
               </select>
               {errors.workerGender && <span className="error">{errors.workerGender}</span>}
            </div>
            <br />

            <button type="submit" className="submit-button">Submit</button>
         </form>
      </div>

      </div>
   );
}
