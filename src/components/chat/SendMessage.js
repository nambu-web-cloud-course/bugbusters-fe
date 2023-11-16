import { useParams } from "react-router-dom";
import Button from "../common/Button";
import { GapItems } from "../common/Items";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";

export default function SendMessage({ socket }) {
  const { chatroom } = useParams();
  const [room, setRoom] = useState("");
  useEffect(() => {
    setRoom(chatroom);
  }, []);

  const userid = JSON.parse(localStorage.getItem("userid"));
  const [message, setMessage] = useState("");
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const createdAt = Date.now();
    if (message !== "") {
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { message, userid, room, createdAt });
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
        <Button color="green" size="lg" width="30%" onClick={sendMessage}>
          전송
        </Button>
      </GapItems>
    </div>
  );
}
