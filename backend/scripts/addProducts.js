const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const addProducts = async () => {
  const products = [
    { name: 'Laptop', description: 'High-performance laptop', price: 1200 },
    { name: 'Smartphone', description: 'Latest model smartphone', price: 800 },
    { name: 'Headphones', description: 'Noise-cancelling headphones', price: 150 },
    { name: 'Smartwatch', description: 'Feature-rich smartwatch', price: 200 },
    { name: 'Tablet', description: 'Lightweight and powerful tablet', price: 600 },
  ];

  try {
    await Product.insertMany(products);
    console.log('Products added successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error adding products', err);
  }
};

addProducts();
