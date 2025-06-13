import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./myorder.css";
import apiClient from "../../service/api_service";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.userId);
    }
  }, []);

  // ✅ Wrap fetchOrders with useCallback
  const fetchOrders = useCallback(async () => {
    if (!userId) return; // Prevents unnecessary API calls
    setLoading(true);
    try {
      const response = await apiClient.get("/listAllWorks");
      const allOrders = response.data.content;
      const userOrders = allOrders.filter(order => order.userId === userId);
      setOrders(userOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]); // Now it only runs when userId changes

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // ✅ No more ESLint warning

  const handleRefresh = () => {
    fetchOrders();
  };

  return (
    <div className="my-order-page">
      <div className="my-order-header">
        <h1 className="my-orders">My Works</h1>
        <div>
          <button className="refresh-button" onClick={handleRefresh}>
            &#x21bb; Refresh
          </button>
          <button className="create-button" onClick={() => navigate("/creatework")}>
            + Create Work
          </button>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p></p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Work ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone No</th>
                <th>Work Address</th>
                <th>Work Day</th>
                <th>Work Date</th>
                <th>Work Time</th>
                <th>No of Workers</th>
                <th>Work Type</th>
                <th>Worker Gender</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.workId}>
                  <td>{order.workId}</td>
                  <td>{order.firstName}</td>
                  <td>{order.lastName}</td>
                  <td>{order.phoneNo}</td>
                  <td>{order.workAddress}</td>
                  <td>{order.workDay}</td>
                  <td>{order.workDate}</td>
                  <td>{order.workTime}</td>
                  <td>{order.noOfWorkers}</td>
                  <td>{order.workType}</td>
                  <td>{order.workerGender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
