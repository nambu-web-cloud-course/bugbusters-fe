import { useParams } from "react-router-dom";
import { GapItems } from "../common/GapItems";
import Button from "../common/Button";
import { useEffect, useState } from "react";

export default function SendMessage({ socket }) {
  const { chatroom } = useParams();
  const [room, setRoom] = useState("");
  useEffect(() => {
    setRoom(chatroom);
  }, []);

  const userid = JSON.parse(localStorage.getItem("userid"));
  const [message, setMessage] = useState("");
  const handleOnKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const createdAt = Date.now();
    if (message !== "") {
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
          onKeyDown={handleOnKeyDown}
        />
        <Button color="green" size="lg" width="20%" onClick={sendMessage}>
          전송
        </Button>
      </GapItems>
    </div>
  );
}
