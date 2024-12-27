import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/orders/${userId}`);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p>User ID: {order.userId}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.productId._id} className="order-item">
                  <span>{item.productId.name}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Total: ${item.total}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Orders;
