import React, { useState } from 'react';
import axios from 'axios';

const FileUploadWithSizeLimit = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Check file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setMessage('File size exceeds the 2MB limit. Please choose a smaller file.');
        setFile(null); // Clear the file
        return;
      }

      setFile(selectedFile);
      setMessage(''); // Clear previous messages
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    // Check the file type before uploading
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setMessage('Invalid file type. Only JPG and PNG images are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true); // Start loading
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message || 'File uploaded successfully!');
      setFile(null); // Clear the file after successful upload
    } catch (error) {
      // Handle errors from the server or network
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'File upload failed.');
      } else {
        setMessage('Network error or server unavailable.');
      }
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div>
      <h1>File Upload with Size Limit</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading || !file}>
        {isLoading ? 'Uploading...' : 'Upload File'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploadWithSizeLimit;