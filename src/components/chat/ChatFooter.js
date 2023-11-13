import { useState } from "react";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
// 리액트 훅 폼으로 바꾸기?

const ChatFooter = ({ socket }) => {
  const { room } = useParams();
  const [message, setMessage] = useState("");

  // 받은 메시지들 저장
  const [receivedMessage, setReceivedMessage] = useState([])
  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("userid")} is typing`);
  };


  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", {
      test: "test",
      message: message,
      userid: localStorage.getItem("userid"),
      room: room,
      createdAt: Date.now(),
    });

    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="메시지를 작성하세요."
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">전송</button>
      </form>
    </div>
  );
};

export default ChatFooter;
