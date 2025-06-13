import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import apiClient from "../../service/api_service";
import "./admin.css";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  // Get stored statuses from local storage
  const getStoredStatuses = () => {
    const storedData = localStorage.getItem("workStatuses");
    return storedData ? JSON.parse(storedData) : {};
  };

  // Store updated statuses in local storage
  const storeStatuses = (statuses) => {
    localStorage.setItem("workStatuses", JSON.stringify(statuses));
  };

  // Fetch Orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/listAllWorks", {
        params: { pageNumber: 0, size: 100 },
      });

      let fetchedData = response.data.content || [];
      const storedStatuses = getStoredStatuses();

      // Apply stored statuses
      fetchedData = fetchedData.map((row) => ({
        ...row,
        status: storedStatuses[row.workId] || row.status,
      }));

      setData(fetchedData);
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

  // Handle Status Change
  const handleStatusChange = async (workId, newStatus) => {
    const updatedData = data.map((row) =>
      row.workId === workId ? { ...row, status: newStatus } : row
    );
    setData(updatedData);

    // Update status in local storage
    const storedStatuses = getStoredStatuses();
    storedStatuses[workId] = newStatus;
    storeStatuses(storedStatuses);

    try {
      await apiClient.put(`/updateWork/${workId}`, { status: newStatus });
      alert(`Status changed to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Status Updated Successfully");
    }
  };

  // Handle Delete Work
  const handleDeleteParcel = async (workId) => {
    if (window.confirm("Are you sure you want to delete this work?")) {
      try {
        await apiClient.delete("/deleteWork", { data: { workId } });
        
        // Remove from local storage
        const storedStatuses = getStoredStatuses();
        delete storedStatuses[workId];
        storeStatuses(storedStatuses);

        // Update state
        setData(data.filter((row) => row.workId !== workId));
        alert("Work deleted successfully!");
      } catch (error) {
        console.error("Failed to delete work", error);
        alert("Failed to delete work. Please try again.");
      }
    }
  };

  // Redirect to vehicle_adminDashboard
  const handleAllocateWork = () => {
    navigate("/createworkallocation");
  };

   const handleClick = () => {
    navigate('/vehicle_adminDashboard');  
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
      </nav>

      <div className="admin-container">
        <div className="admin-header">
          <h2>Admin Page</h2>
          <button className="refresh-button" onClick={fetchOrders}>
            &#x21bb; Refresh
          </button>
          <button className="refresh-button" onClick={handleClick}>Check Driver</button>
          <button className="refresh-button" onClick={handleAllocateWork}>
             Allocate Work
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Work ID</th>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone No</th>
              <th>Work Address</th>
              <th>Work Day</th>
              <th>Work Date</th>
              <th>Work Time</th>
              <th>No of Workers</th>
              <th>Work Type</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Actions</th>
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
                <tr key={row.workId}>
                  <td>{row.workId}</td>
                  <td>{row.userId}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.phoneNo}</td>
                  <td>{row.workAddress}</td>
                  <td>{row.workDay}</td>
                  <td>{row.workDate}</td>
                  <td>{row.workTime}</td>
                  <td>{row.noOfWorkers}</td>
                  <td>{row.workType}</td>
                  <td>{row.workerGender}</td>
                  <td>
                    <select
                      value={row.status}
                      onChange={(e) => handleStatusChange(row.workId, e.target.value)}
                    >
                      <option value="Allocated">Allocated</option>
                      <option value="Not Allocated">Not Allocated</option>
                    </select>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteParcel(row.workId)}>
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
