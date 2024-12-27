import React, { useState } from "react";
import axios from "axios";
import "./BuyNow.css";

const BuyNow = ({ productId, totalPrice, quantity }) => {
  const userId = localStorage.getItem("userId");

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuyNow = async () => {
    setIsProcessing(true);
    setMessage("");

    const requestData = {
      userId,
      productId,
      quantity,
      paymentDetails,
      shippingAddress,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/products/buy-now", requestData);
      setMessage(response.data.message || "Purchase successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to complete purchase. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="buy-now-container">
      <h2>Complete Your Purchase</h2>
      <div className="total-price">Total: ${totalPrice}</div>

      {/* Payment Details */}
      <div className="form-section">
        <h3>Payment Details</h3>
        <input
          type="text"
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChange={(e) =>
            setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          value={paymentDetails.expiryDate}
          onChange={(e) =>
            setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="CVV"
          value={paymentDetails.cvv}
          onChange={(e) =>
            setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
          }
        />
      </div>

      {/* Shipping Address */}
      <div className="form-section">
        <h3>Shipping Address</h3>
        <input
          type="text"
          placeholder="Street"
          value={shippingAddress.street}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, street: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="City"
          value={shippingAddress.city}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, city: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="State"
          value={shippingAddress.state}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, state: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="ZIP"
          value={shippingAddress.zip}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, zip: e.target.value })
          }
        />
      </div>

      <button
        className="confirm-purchase-btn"
        onClick={handleBuyNow}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Confirm Purchase"}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default BuyNow;
