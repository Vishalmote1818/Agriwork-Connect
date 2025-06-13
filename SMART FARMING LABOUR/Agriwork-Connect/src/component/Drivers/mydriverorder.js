import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./mydriverorder.css";
import apiClient from "../../service/api_service";
import "./vehicle_dashboard";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [labourId, setUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      console.log(user.labourId);  // Log the labourId to verify
      setUserId(user.labourId);
    }
  }, []);
  

  // ✅ Wrap fetchOrders with useCallback
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/listAllDriver1", {
        params: { pageNumber: 0, size: 100 }, // Fetch up to 100 parcels
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
  }, [fetchOrders]); // ✅ No more ESLint warning

  const handleRefresh = () => {
    fetchOrders();
  };

  return (
    <div className="my-order-page">
      <div className="my-order-header">
        <h1 className="my-orders">Labours Respective To Driver:</h1>
        <div>
        <button className="refresh-button" onClick={() => navigate("/vehicle_adminDashboard")}>
         Labours Status
        </button>

          <button className="refresh-button" onClick={handleRefresh}>
            &#x21bb; Refresh
          </button>
          <button className="create-button" onClick={() => navigate("/createdrivers")}>
            + Add Labours
          </button>
        </div>
      </div>
    <br/><br/>
   

      {/* <div className="my-order-header">
      <h1 className="my-orders">Labours Respective To Drive 2:</h1>

        <div>
          <button className="refresh-button">
           Driver 2
          </button>
          <button className="refresh-button" onClick={handleRefresh}>
            &#x21bb; Refresh
          </button>
          <button className="create-button" onClick={() => navigate("/createdrivers")}>
            + Add Labours
          </button>
        </div>
      </div> */}
      
      {/* <br/><br/>
      <div className="my-order-header">
        <h1 className="my-orders">Labours Respective To Driver 3:</h1>
        <div>
          <button className="refresh-button">
           Driver 3
          </button>
          <button className="refresh-button" onClick={handleRefresh}>
            &#x21bb; Refresh
          </button>
          <button className="create-button" onClick={() => navigate("/createdrivers")}>
            + Add Labours
          </button>
        </div>
      </div> */}

      <div className="table-container">
        {loading ? (
          <p></p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Labour Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>Experience</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.labourId}>
                  <td>{order.labourId}</td>
                  <td>{order.labourFirstName}</td>
                  <td>{order.labourLastName}</td>
                  <td>{order.address}</td>
                  <td>{order.phoneNo}</td>
                  <td>{order.experience}</td>
                  <td>{order.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
