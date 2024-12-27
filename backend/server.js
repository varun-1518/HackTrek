const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');


// Import routes
const challengeRoutes = require('./routes/challengeRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes'); 
const privacyPolicyRoutes = require('./routes/privacyPolicyRoutes');
const confidentialDocumentRoutes = require('./routes/confidentialDocumentRoutes');
const xssRoutes = require('./routes/xssChallenge');
const reflectedXssRoute = require('./routes/reflectedXssRoute');
const unvalidatedRedirectsRoutes = require('./routes/unvalidatedRedirectsRoutes');
const passwordRoutes = require("./routes/passwordRoutes");
const chatbotRoutes = require('./chatbot/chatbotRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
// Load environment variables
dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from React frontend
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// Proxy route for resolving CORS issues
app.get('/api/proxy', async (req, res) => {
  const { target } = req.query;

  if (!target) {
    return res.status(400).json({ error: 'Target URL is required' });
  }

  try {
    // Fetch content from the target URL
    const response = await axios.get(target, { responseType: 'stream' });

    // Relay the response headers and stream the data to the client
    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (error) {
    console.error('Error in proxying:', error.message);
    res.status(500).json({ error: 'Failed to fetch target URL' });
  }
});


// Routes
app.use('/api/challenges', challengeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', fileRoutes);
app.use('/api/privacy-policy', privacyPolicyRoutes);
app.use('/api/confidential-document', confidentialDocumentRoutes);
app.use("/api/xss", xssRoutes);
app.use('/api/reflected-xss-challenge', reflectedXssRoute);
app.use('/api/redirects', unvalidatedRedirectsRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/chatbot', chatbotRoutes); // Chatbot route added
app.use('/api/leaderboard', leaderboardRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
