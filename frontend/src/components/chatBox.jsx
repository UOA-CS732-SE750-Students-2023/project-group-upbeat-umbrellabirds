import React, { useState, useEffect, useRef } from "react";
import socket from "../socket"; // Replace with your server URL
import usePost from "../hooks/usePost";
import usePut from "../hooks/usePut";

const ChatBox = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messageContainerRef = useRef(null);


  useEffect(() => {
    // Event listener for new messages received from the server
    socket.on("getMessage", (message) => {
      setMessages([...messages, message]);
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("new message");
    };
  }, [messages]);

  // Scroll to the bottom of the message container whenever new messages are received
  useEffect(() => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      // Emit a new message to the server
      let roomCode = props.roomInfo;
      let message = props.userName + ": " + inputValue.trim();
      console.log(message, roomCode, "message, roomCode");
      socket.emit("newMessage", { message, roomCode });
      let response = usePut(`http://localhost:5001/api/room/message/${roomCode}`, {
        message: message,
        });
      setInputValue("");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexGrow: "1",
          overflowY: "auto",
        }}
        ref={messageContainerRef}
      >
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
        }}
        onSubmit={handleMessageSubmit}
      >
        <input
          type="text"
          placeholder="Enter message"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          style={{
            flexGrow: "1",
            marginRight: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
