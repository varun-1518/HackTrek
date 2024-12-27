

# HackTrek: Vulnerable Web Application

---

## **Overview**
HackTrek is a learning platform designed to help security enthusiasts and professionals understand and exploit common web application vulnerabilities. Built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, HackTrek provides hands-on challenges that simulate real-world security flaws, enabling users to hone their penetration testing skills in a safe environment.

The platform includes challenges like:
- SQL Injection
- Cross-Site Scripting (XSS)
- File Upload Vulnerabilities
- Weak Password Validation
- Admin Login Exploitation

HackTrek also includes a **Chatbot** implemented directly within the MERN stack to guide users through challenges.

---

## **Prerequisites**
Before you can set up HackTrek, ensure you have the following installed:
1. **Node.js** (v14 or later)
2. **MongoDB** (Local or cloud-based)
3. **npm** (Node Package Manager)
4. **Git** (for cloning the repository)

---

## **Code Dependencies**
The platform relies on several dependencies for both backend and frontend functionality. Below are the key dependencies:

### Backend:
- **bcryptjs**: For password hashing.
- **jsonwebtoken**: To create and verify tokens for authentication.
- **xss**: To handle XSS sanitization in vulnerable endpoints.
- **multer**: For managing file uploads in challenges.
- **dotenv**: To manage environment variables.
- **body-parser**: To parse incoming request bodies in a middleware.

### Frontend:
- **axios**: To handle API requests.
- **react-router-dom**: For routing in the frontend.
- **Bootstrap**: For UI components and styling.

To view all dependencies, refer to the `package.json` files in both the `backend` and `frontend` directories.

---

## **Setup Instructions**

### Clone the Repository
```bash
git clone https://github.com/varun-1518/HackTrek.git
cd HackTrek
```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   MONGO_URI=<your_mongo_connection_string>
   PORT=5000
   ```
4. Create a uploads folder in backend directory .The uploads folder is required to store files uploaded during challenges. Create the folder in the backend directory:
   ```bash
   mkdir uploads
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

---

## **Features**

### Challenges
1. **SQL Injection**: Exploit database queries to bypass authentication.
2. **XSS (Reflected and DOM-based)**: Inject scripts and manipulate the DOM.
3. **File Upload Vulnerabilities**: Test file upload restrictions and exploit them.
4. **Admin Login**: Gain unauthorized access through improper validation.
5. **Weak Password Validation**: Discover and exploit weak password mechanisms.



### Chatbot Assistant
Implemented within the MERN stack, the chatbot provides:
- Guidance for solving challenges.
- Educational insights and solutions.

---

## **Conclusion**
HackTrek is a comprehensive platform for learning web security by practicing real-world vulnerabilities. It provides a safe environment for experimenting with attack techniques and understanding secure coding practices.

We encourage contributions to improve the platform and feedback for new challenges. If you encounter any issues, submit them via GitHub Issues.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---


### **Happy Hacking!** 🛡️✨
