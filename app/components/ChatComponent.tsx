"use client";

import React, { useState } from 'react';
import axios from 'axios';

interface ChatComponentProps {
  userId: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('/api/chat', { message, userId });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
      <div>{response}</div>
    </div>
  );
};

export default ChatComponent;