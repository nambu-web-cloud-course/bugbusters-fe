import styles from "./styles.module.css";
import React, { useState } from "react";
// 리액트 훅 폼으로 수정하기

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(); 
    }
  };

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleOnKeyPress}
      />
      <button className="btn btn-primary" onClick={sendMessage}>
       전송
      </button>
    </div>
  );
};

export default SendMessage;
