import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiClient from "../../service/api_service";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/listAllWorkAllocations", {
        params: { pageNumber: 0, size: 100 },
      });
      console.log("API Response:", response.data);
      setData(response.data.content || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  
  const handleStatusChange = async (workAllocationId, newStatus) => {
    const updatedData = data.map((row) =>
      row.workAllocationId === workAllocationId ? { ...row, status: newStatus } : row
    );
    setData(updatedData);

    try {
      await apiClient.put(`/updateWorkAllocation/${workAllocationId}`, { status: newStatus });
      alert(`Status changed to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDeleteParcel = async (workAllocationId) => {
    if (window.confirm("Are you sure you want to delete this work Allocation?")) {
      try {
        await apiClient.delete("/deleteWorkAllocation", { data: {workAllocationId } });
        setData(data.filter((row) => row.workAllocationId !== workAllocationId));
        alert("Work Allocation deleted successfully!");
      } catch (error) {
        console.error("Failed to delete work", error);
        alert("Failed to delete work. Please try again.");
      }
    }
  };

  return (
    <div>
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
             {/* Login Button */}
                      <div className="dropdown">
                        <button className="dropbtn">
                          <Link to="/login" className="login-link" style={{ textDecoration: "none", color: "black" }}>
                            Login
                          </Link>
                        </button>
                      </div>
          </div>
        </div>
      </nav>
      <br/>
      <div className="admin-container">
        <div className="admin-header">
          <h2>Work Allocation</h2>
          <h2>Congrats Work Allocated</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Farmer Name</th>
              <th>Farm Address</th>
              <th>Farmer Phone</th>
              <th>Farmer Email</th>
              <th>Driver Name</th>
              <th>Vehicle No</th>
              <th>Driver Phone</th>
              <th>Driver Email</th>
              <th>Charges</th>
              <th>Work Type</th>
              <th>Work Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="14">Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="14">No orders found.</td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.workAllocationId}>
                  <td>{row.workAllocationId}</td>
                  <td>{row.farmerName}</td>
                  <td>{row.farmAddress}</td>
                  <td>{row.farmerPhoneNo}</td>
                  <td>{row.farmerMail}</td>
                  <td>{row.driverName}</td>
                  <td>{row.vehicleNo}</td>
                  <td>{row.driverPhoneNo}</td>
                  <td>{row.driverMail}</td>
                  <td>{row.platformCharges}</td>
                  <td>{row.workType}</td>
                  <td>{row.workDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
