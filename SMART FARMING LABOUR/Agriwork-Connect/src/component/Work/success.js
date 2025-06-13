import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect back to the payment form after 5 seconds
    const timer = setTimeout(() => {
      navigate("/paymentdetails");
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="success-container">
      <h1>Payment Successful!</h1>
      <p>Your payment has been completed successfully.</p>
    </div>
  );
}

export default Success;
