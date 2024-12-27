const express = require('express');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const router = express.Router();
const Order = require("../models/Order");

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get cart by user ID
router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    console.error('Invalid user ID');
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart is empty' });
    res.json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add product to cart
router.post('/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || typeof quantity !== 'number' || quantity <= 0) {
    console.error('Invalid input: userId, productId, and positive quantity are required');
    return res.status(400).json({ message: 'Invalid input: userId, productId, and positive quantity are required' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate('items.productId'); // Populate after save
    res.json(updatedCart);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Adjust quantity in cart
router.put('/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body; // quantity is the absolute value for adjustment

  if (!userId || !productId || typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        // Remove the item if quantity drops to 0 or below
        cart.items = cart.items.filter(i => i.productId.toString() !== productId);
      }
      await cart.save();
      const updatedCart = await Cart.findOne({ userId }).populate('items.productId'); // Populate after update
      return res.json(updatedCart);
    }

    return res.status(404).json({ message: 'Product not found in cart' });
  } catch (err) {
    console.error('Error adjusting cart quantity:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete product from cart
router.delete('/cart/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate('items.productId'); // Populate after save
    res.json(updatedCart);
  } catch (err) {
    console.error('Error deleting cart item:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Place a new order
router.post("/orders", async (req, res) => {
  const { userId, items, totalAmount, shippingAddress } = req.body;

  if (!userId || !items || !totalAmount || !shippingAddress) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
    });

    await order.save();

    // Clear the cart after placing an order
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch all orders for a user
router.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate("items.productId");
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Buy Now - Checkout
router.post('/buy-now', async (req, res) => {
  const { userId, productId, quantity, paymentDetails, shippingAddress } = req.body;

  if (!userId || !productId || !quantity || !paymentDetails || !shippingAddress) {
    return res.status(400).json({ message: 'Invalid input: All fields are required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Mock processing of payment (e.g., integrate Stripe or PayPal here)
    console.log('Processing payment with details:', paymentDetails);

    // Reduce stock quantity
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    product.stock -= quantity;
    await product.save();

    // Create a mock order record (this would usually involve saving to a separate orders collection)
    const order = {
      userId,
      productId,
      quantity,
      totalAmount: product.price * quantity,
      shippingAddress,
      status: 'Confirmed', // Mock order status
    };

    res.json({ message: 'Purchase successful', order });
  } catch (err) {
    console.error('Error processing Buy Now:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Real-time price update based on quantity
router.post('/price-update', async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const totalPrice = product.price * quantity;
    res.json({ totalPrice });
  } catch (err) {
    console.error('Error updating price:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Place a new order
router.post("/orders", async (req, res) => {
  const { userId, items, totalAmount, shippingAddress } = req.body;

  if (!userId || !items || !totalAmount || !shippingAddress) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all orders for a specific user
router.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate("items.productId");
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all orders (admin functionality)
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId userId");
    res.json(orders);
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;    