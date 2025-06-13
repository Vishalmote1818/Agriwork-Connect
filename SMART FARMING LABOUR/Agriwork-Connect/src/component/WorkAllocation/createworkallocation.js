import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./createworkallocation.css";
import apiClient from "../../service/api_service";

export default function CreateWorkAllocation() {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      farmerName: "",
      farmAddress: "",
      farmerPhoneNo: "",
      farmerMail: "",
      driverName: "",
      vehicleNo: "",
      driverPhoneNo: "",
      driverMail: "",
      platformCharges: "",
      workType: "",
      workDate: "",
   });

   const [errors, setErrors] = useState({});

   useEffect(() => {
      const workAllocationData = localStorage.getItem("workAllocation");
      if (workAllocationData) {
         try {
            const parsedData = JSON.parse(workAllocationData);
            setFormData((prev) => ({
               ...prev,
               ...parsedData,
            }));
         } catch (error) {
            console.error("Error parsing work allocation data from localStorage:", error);
         }
      }
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const validateForm = () => {
      const newErrors = {};
      if (!formData.farmerName.trim()) newErrors.farmerName = "Farmer Name is required";
      if (!formData.farmAddress.trim()) newErrors.farmAddress = "Address is required";
      if (!formData.driverName.trim()) newErrors.driverName = "Driver name is required";
      if (!formData.farmerPhoneNo || !/^\d{10}$/.test(formData.farmerPhoneNo.trim()))
         newErrors.farmerPhoneNo = "Farmer Phone number must be a valid 10-digit number";
      if (!formData.driverPhoneNo || !/^\d{10}$/.test(formData.driverPhoneNo.trim()))
         newErrors.driverPhoneNo = "Driver Phone number must be a valid 10-digit number";
      if (!formData.vehicleNo.trim()) newErrors.vehicleNo = "Vehicle No is required";
      if (!formData.workDate.trim()) newErrors.workDate = "Work date is required";
      if (!formData.platformCharges || isNaN(parseFloat(formData.platformCharges)))
         newErrors.platformCharges = "Platform Charges must be a valid number";
      if (!formData.farmerMail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.farmerMail.trim()))
         newErrors.farmerMail = "Valid Farmer Email is required";
      if (!formData.driverMail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.driverMail.trim()))
         newErrors.driverMail = "Valid Driver Email is required";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      
      try {
         const payload = {
            farmerName: formData.farmerName.trim(),
            farmAddress: formData.farmAddress.trim(),
            farmerPhoneNo: formData.farmerPhoneNo.trim(),
            farmerMail: formData.farmerMail.trim(),
            driverName: formData.driverName.trim(),
            vehicleNo: formData.vehicleNo.trim(),
            driverPhoneNo: formData.driverPhoneNo.trim(),
            driverMail: formData.driverMail.trim(),
            platformCharges: parseFloat(formData.platformCharges),
            workType: formData.workType.trim(),
            workDate: formData.workDate ? new Date(formData.workDate).toISOString().split("T")[0] : null
         };

         await apiClient.post("/createWorkAllocation", payload, {
            headers: { "Content-Type": "application/json" },
         });

         alert("Work Allocated successfully!");
         navigate("/admin_dashboard");
      } catch (error) {
         console.error("Error creating work allocation:", error.response?.data || error.message);
         setErrors({ api: error.response?.data?.message || "Failed to allocate work. Please try again." });
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
               {/* Register Button */}
               <div className="dropdown">
                  <button className="dropbtn">Register</button>
                  <div className="dropdown-content">
                     <Link to="/register">Register User</Link>
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

         {/* Work Allocation Form */}
         <div className="parcel-modal">
            <h2 className="parcel-details-text">Work Allocation Details</h2>
            <form className="create-parcel-form" onSubmit={handleSubmit}>
               {Object.keys(formData).map((field) => (
                  <div key={field} className="col">
                     <label>{field.replace(/([A-Z])/g, " $1").trim()}:</label>
                     <input
                        type={field.includes("Mail") ? "email" : field === "workDate" ? "date" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
                     />
                     {errors[field] && <span className="error">{errors[field]}</span>}
                  </div>
               ))}
               {errors.api && <div className="error api-error">{errors.api}</div>}
               <br/>
               <button type="submit" className="submit-button">Submit</button>
            </form>
         </div>
      </div>
   );
}