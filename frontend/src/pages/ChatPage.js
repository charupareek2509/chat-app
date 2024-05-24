import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChat = async () => {
    try {
      const response = await axios.get("/chats");
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div>
      {chats.map(chat => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
