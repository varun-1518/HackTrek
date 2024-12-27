import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import SQLInjection from './pages/SqlInjection'; // Make sure the file name matches exactly
import AdminLogin from './pages/AdminLogin';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import FileUpload from './pages/FileUpload';
import FileUploadWithSizeLimit from './pages/FileUploadWithSizeLimit';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ConfidentialDocument from './pages/ConfidentialDocument';
import BonusXSS from './pages/BonusXSS';
import ReflectedXssChallenge from "./pages/ReflectedXssChallenge";
import UnvalidatedRedirectChallenge from './pages/UnvalidatedRedirectChallenge';
import PasswordStrengthChecker from "./pages/PasswordStrengthChecker";
import Chatbot from './components/Chatbot';
import Leaderboard from './pages/Leaderboard';
function App() {
  return (
    <Router>
      <div>
        
        <nav style={navStyle}>
          <div style={brandStyle}>HackTrek</div> {/* HackTrek added here */}
          <div style={linksWrapperStyle}>
            <NavLink to="/" style={linkStyle} activeStyle={activeLinkStyle}>Home</NavLink>
            <NavLink to="/challenges" style={linkStyle} activeStyle={activeLinkStyle}>Challenges</NavLink>
            <NavLink to="/products" style={linkStyle} activeStyle={activeLinkStyle}>Products</NavLink>
            <NavLink to="/cart" style={linkStyle} activeStyle={activeLinkStyle}>Cart</NavLink>
            <NavLink to="/orders" style={linkStyle} activeStyle={activeLinkStyle}>Orders</NavLink>
            <NavLink to="/login" style={linkStyle} activeStyle={activeLinkStyle}>Login</NavLink>
            <NavLink to="/register" style={linkStyle} activeStyle={activeLinkStyle}>Register</NavLink>
            <NavLink to="/chatbot" style={linkStyle} activeStyle={activeLinkStyle}>Chatbot</NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/sql-injection" element={<SQLInjection />} />
          <Route path="/challenges/admin-login" element={<AdminLogin />} />
          <Route path="/challenges/FileUpload" element={<FileUpload />} />
          <Route path="/challenges/FileUploadWithSizeLimit" element={<FileUploadWithSizeLimit />} /> 
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/confidential-document" element={<ConfidentialDocument />} />
          <Route path="/bonus-xss" element={<BonusXSS />} />
          <Route path="/reflected-xss-challenge" element={<ReflectedXssChallenge/>} />
          <Route path="/unvalidated-redirects" element={<UnvalidatedRedirectChallenge/>} />
          <Route path="/password-checker" element={<PasswordStrengthChecker />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/chatbot" element={<Chatbot />} /> {/* Add Chatbot Route */}
        </Routes>
      </div>
    </Router>
  );
}

const navStyle = {
  padding: '10px',
  backgroundColor: '#1E1E1E', // Darker navbar background
  color: '#E0E0E0',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
};

const brandStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#BB86FC', // Accent color for branding
  marginRight: 'auto',
};

const linksWrapperStyle = {
  display: 'flex',
  gap: '15px',
  justifyContent: 'center',
  width: '100%',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#E0E0E0',
  padding: '5px 10px',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

const activeLinkStyle = {
  backgroundColor: '#BB86FC', // Highlight color for active links
  color: '#121212',
  fontWeight: 'bold',
};

export default App;