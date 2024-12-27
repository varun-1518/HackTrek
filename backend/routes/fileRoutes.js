const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Directory where files will be uploaded
const uploadDir = 'uploads/';

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const secureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store the file in 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Generate a unique file name using timestamp and extension
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName); // Set the filename
  },
});

// Function to validate file types based on MIME type
const validateFileType = (file) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png']; // Only allow JPG and PNG
  return allowedMimeTypes.includes(file.mimetype);
};

// Multer upload configuration with file type validation and size restriction
const upload = multer({
  storage: secureStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit to 2MB
  fileFilter: (req, file, cb) => {
    if (validateFileType(file)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only JPG and PNG images are allowed.')); // Reject invalid file types
    }
  },
});

// POST route to upload files
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({
    message: 'File uploaded successfully!',
    file: req.file, // Provide details of the uploaded file
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle specific multer errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large. The maximum allowed size is 2MB.',
      });
    }
    return res.status(400).json({ error: 'File upload failed. Please try again.' });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

module.exports = router;
