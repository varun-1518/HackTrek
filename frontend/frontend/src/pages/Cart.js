import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [realTimePrice, setRealTimePrice] = useState({});
  const [isCheckout, setIsCheckout] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/cart/${userId}`);
        setCart(response.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, [userId]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      // Real-time price update
      const response = await axios.post('http://localhost:5000/api/products/price-update', {
        productId,
        quantity,
      });
      setRealTimePrice((prevState) => ({
        ...prevState,
        [productId]: response.data.totalPrice,
      }));

      // Update quantity in cart
      const cartResponse = await axios.put('http://localhost:5000/api/products/cart', {
        userId,
        productId,
        quantity,
      });
      setCart(cartResponse.data);
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/cart/${userId}/${productId}`);
      setCart(response.data);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handleBuyNow = () => {
    if (!cart || cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsCheckout(true); // Show the address and payment form
  };

  const handleSubmitOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/products/orders', {
        userId,
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          total: item.productId.price * item.quantity,
        })),
        totalAmount: cart.items.reduce(
          (total, item) => total + item.productId.price * item.quantity,
          0
        ),
        shippingAddress: address,
        paymentDetails,
      });

      alert(response.data.message);
      setCart(null); // Clear cart after purchase
      navigate('/orders'); // Redirect to Orders page after purchase
    } catch (err) {
      console.error('Error during order submission:', err);
    }
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'address') {
      setAddress((prev) => ({ ...prev, [name]: value }));
    } else if (type === 'payment') {
      setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart && cart.items.length > 0 ? (
        <div>
          {cart.items.map((item) => (
            <div key={item.productId._id} className="cart-item">
              <span>{item.productId.name}</span>
              <span>Price: ${realTimePrice[item.productId._id] || item.productId.price}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                min="1"
              />
              <button onClick={() => handleRemoveItem(item.productId._id)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}
          <button onClick={handleBuyNow} className="buy-now-btn">
            Buy Now
          </button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}

      {isCheckout && (
        <div className="checkout-form">
          <h2>Enter Shipping Address</h2>
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={(e) => handleInputChange(e, 'address')}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={(e) => handleInputChange(e, 'address')}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={(e) => handleInputChange(e, 'address')}
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={address.zip}
            onChange={(e) => handleInputChange(e, 'address')}
          />

          <h2>Enter Payment Details</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) => handleInputChange(e, 'payment')}
          />
          <input
            type="text"
            name="cardExpiry"
            placeholder="Expiry Date (MM/YY)"
            value={paymentDetails.cardExpiry}
            onChange={(e) => handleInputChange(e, 'payment')}
          />
          <input
            type="text"
            name="cardCVV"
            placeholder="CVV"
            value={paymentDetails.cardCVV}
            onChange={(e) => handleInputChange(e, 'payment')}
          />

          <button onClick={handleSubmitOrder} className="submit-order-btn">
            Submit Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
