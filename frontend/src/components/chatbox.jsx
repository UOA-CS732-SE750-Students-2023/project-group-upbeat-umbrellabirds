import React, { useState } from "react";
import './chatbox.css'

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, { sender: "Me", text: messageInput }]);
    setMessageInput("");
  };

  return (
    <div className="chatbox">
      <div style={{ height: "300px", overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
  
}

export default ChatBox;