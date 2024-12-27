const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const addUser = async () => {
  const user = new User({
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com',
  });

  await user.save();
  console.log('User added successfully');
  mongoose.connection.close();
};

addUser();
