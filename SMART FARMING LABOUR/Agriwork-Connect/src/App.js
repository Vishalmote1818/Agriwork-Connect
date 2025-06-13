import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Login/login";
import Admin from "./component/admin/admin";
import AdminLogin from "./component/admin_login/adminlogin";
import ContactUs from "./component/contact_us/contact_us";
import UserDashboard from "./component/Work/user_dashboard";
import LandingPage from "./component/landing_page/landing_page";
import Profile from "./component/profile/profile";
import Register from "./component/register/register";
import AboutUs from "./component/about_us/about_us";
import RegisterEmp from "./component/Employee/reigster_emp"; // Possible typo?
import LoginEmp from "./component/Employee/login_emp";
import RegisterVehicle from "./component/Vehicle/register_vehicle";
import LoginVehicle from "./component/Vehicle/login_vehicle";
import CreateWork from "./component/Work/creatework"
import CreateDrivers from "./component/Drivers/createdrivers"
import MyDriverOrder from "./component/Drivers/mydriverorder"
import VehicleDashboard from "./component/Drivers/vehicle_dashboard"
import VehicleAdminDashboard from "./component/Drivers/vehicle_adminDashboard"
import CreateWorkAllocation from "./component/WorkAllocation/createworkallocation"
import AllocationDashboard from "./component/WorkAllocation/allocation_dashboard"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/admin_dashboard" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/register_emp" element={<RegisterEmp/>} />
          <Route path="/login_emp" element={<LoginEmp/>} />
          <Route path="/register_vehicle" element={<RegisterVehicle/>} />
          <Route path="/login_vehicle" element={<LoginVehicle/>} />
          <Route path="/creatework" element={<CreateWork/>} />
          <Route path="/createdrivers" element={<CreateDrivers/>} />
          <Route path="/mydriverorder" element={<MyDriverOrder/>} />
          <Route path="/vehicle_dashboard" element={<VehicleDashboard />} />
          <Route path="/vehicle_adminDashboard" element={<VehicleAdminDashboard/>} />   
          <Route path="/createworkallocation" element={<CreateWorkAllocation/>} />   
          <Route path="/allocation_dashboard" element={<AllocationDashboard/>} />   



        </Routes>
      </div>
    </Router>
  );
}

export default App;
