import Button from "../common/Button";
import { GapItems } from "../common/Items";
import styles from "./styles.module.css";
import React, { useState } from "react";

const SendMessage = ({ socket, room }) => {
  const uid = localStorage.getItem("userid");
 const userid = JSON.parse(uid);
  const [message, setMessage] = useState("");
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message !== "") {
      const createdAt = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      console.log('userid:',userid);
      socket.emit("send_message", { userid, room, message, createdAt });
      setMessage("");
    }
  };

  return (
    <div>
      <GapItems>
        <input
          placeholder="메시지를 전송하세요."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={handleOnKeyPress}
        />
        <Button color="green" size="lg" width="30%" fullWidth onClick={sendMessage}>
          전송
        </Button>
      </GapItems>
    </div>
  );
};

export default SendMessage;
