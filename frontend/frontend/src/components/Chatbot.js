import React, { useState } from 'react';

function Chatbot() {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUserMessage = async (event) => {
        event.preventDefault();

        if (!userMessage.trim()) {
            setErrorMessage('Please type a message.');
            return;
        }
        
        setErrorMessage('');
        
        // Add user's message to chat history
        setChatHistory((prevHistory) => [...prevHistory, { sender: 'user', text: userMessage }]);
        
        try {
            const response = await fetch('http://localhost:5000/api/chatbot/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error('Failed to connect to the chatbot server.');
            }

            const data = await response.json();

            // Add bot's reply to chat history
            setChatHistory((prevHistory) => [...prevHistory, { sender: 'bot', text: data.reply }]);
        } catch (error) {
            setChatHistory((prevHistory) => [...prevHistory, { sender: 'bot', text: 'Error connecting to chatbot server.' }]);
        } finally {
            setUserMessage(''); // Clear input field
        }
    };

    return (
        <div style={chatbotStyle}>
            <h2>Chat with HackTrek Bot</h2>
            <div style={chatWindowStyle}>
                {chatHistory.map((message, index) => (
                    <p
                        key={index}
                        style={{
                            textAlign: message.sender === 'user' ? 'right' : 'left',
                            color: message.sender === 'user' ? 'blue' : 'green',
                        }}
                    >
                        <strong>{message.sender === 'user' ? 'You: ' : 'Bot: '}</strong>
                        {message.text}
                    </p>
                ))}
            </div>
            <form onSubmit={handleUserMessage} style={formStyle}>
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type a message"
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Send</button>
            </form>
            {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        </div>
    );
}

// Styles
const chatbotStyle = { padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' };
const chatWindowStyle = { border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto', marginBottom: '20px' };
const formStyle = { display: 'flex', gap: '10px', justifyContent: 'center' };
const inputStyle = { flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' };
const buttonStyle = { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const errorStyle = { color: 'red', marginTop: '10px' };

export default Chatbot;
