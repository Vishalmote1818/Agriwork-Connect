import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../service/api_service";
import "./vehicle_dashboard.css";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [status, setStatus] = useState("Available");

  useEffect(() => {
    const vehicleSession = JSON.parse(sessionStorage.getItem("vehicleData"));
    if (!vehicleSession) {
      alert("Please log in to access this page.");
      navigate("/login");
      return;
    }

    fetchOrders();
    const savedStatus = localStorage.getItem("driverStatus");
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, [navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/listAllDriver1", {
        params: { pageNumber: 0, size: 100 },
      });

      let fetchedData = response.data.content || [];
      const savedRatings = JSON.parse(localStorage.getItem("driverRatings")) || {};
      fetchedData = fetchedData.map((row) => ({
        ...row,
        status: savedRatings[row.labourId] || row.status,
      }));
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("vehicleData");
    navigate("/login");
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
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <br />
      <div className="admin-container">
        <div className="admin-header">
          <button className="refresh-button" onClick={fetchOrders}>
            &#x21bb; Refresh
          </button>
          <button className={`status-toggle-button ${status === "Available" ? "available" : "not-available"}`}
            onClick={() => setStatus(status === "Available" ? "Not Available" : "Available")}
          >
            {status}
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Labour ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>Experience</th>
              <th>Gender</th>
              <th>Ratings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9">Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="9">No orders found.</td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.labourId}>
                  <td>{row.labourId}</td>
                  <td>{row.labourFirstName}</td>
                  <td>{row.labourLastName}</td>
                  <td>{row.address}</td>
                  <td>{row.phoneNo}</td>
                  <td>{row.experience}</td>
                  <td>{row.gender}</td>
                  <td>
                    <select
                      value={row.status}
                      onChange={(e) => {
                        const updatedRatings = JSON.parse(localStorage.getItem("driverRatings")) || {};
                        updatedRatings[row.labourId] = e.target.value;
                        localStorage.setItem("driverRatings", JSON.stringify(updatedRatings));
                        setData((prevData) => prevData.map((r) => (r.labourId === row.labourId ? { ...r, status: e.target.value } : r)));
                      }}
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Average">Average</option>
                      <option value="Below Avg">Below Avg</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => {
                      if (window.confirm("Are you sure you want to delete this work?")) {
                        apiClient.delete("/deleteDriver1", { data: { labourId: row.labourId } }).then(() => {
                          const updatedRatings = JSON.parse(localStorage.getItem("driverRatings")) || {};
                          delete updatedRatings[row.labourId];
                          localStorage.setItem("driverRatings", JSON.stringify(updatedRatings));
                          setData(data.filter((r) => r.labourId !== row.labourId));
                          alert("Work deleted successfully!");
                        }).catch((error) => {
                          console.error("Failed to delete work", error);
                          alert("Failed to delete work. Please try again.");
                        });
                      }
                    }}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
