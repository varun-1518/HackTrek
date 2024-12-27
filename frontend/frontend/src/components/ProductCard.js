import React from 'react';
import axios from 'axios';
import './ProductCard.css'; // Ensure a CSS file exists or create one if needed

const ProductCard = ({ product }) => {
  const userId = localStorage.getItem('userId');

  const handleAddToCart = async () => {
    if (!userId) {
      alert('You need to log in to add products to the cart');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/products/cart', {
        userId,
        productId: product._id,
        quantity: 1,
      });
      alert('Product added to cart');
    } catch (err) {
      console.error('Error adding product to cart:', err);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
