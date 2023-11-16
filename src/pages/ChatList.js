import axios from "axios";
import Container from "../components/common/Container";
import UserInfo from "../components/common/UserInfo";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Span } from "../components/common/Text";

export default function ChatList() {
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));

  const [chatroom, setChatRoom] = useState([]);

  const getChatRoom = async () => {
    const typeid = usertype === "B" ? "busterid" : "userid";
    const URL = `/chat?${typeid}=${userid}`;

    try {
      const res = await axios.get(URL);
      const data = res.data.data;
      if (res.data.success) {
        setChatRoom(data);
      }
    } catch (err) {
      console.log("Get Chatroom Error", err);
    }
  };
  useEffect(() => {
    getChatRoom();
  }, []);
  console.log(chatroom);
  
  return (
    <div className="Content">
      <h1>채팅</h1>
      {/* 내 아이디가 속한 채팅방 목록을 보여줌 */}
      {chatroom.map((room) => (
        <Link to={`/chat/${room.room}`}>
          <Container>
            <UserInfo
              key={room.room}
              busterid={room.busterid}
              userid={room.userid}
              usertype={usertype}
            />
            <Span>{room.createdAt}</Span>
          </Container>
        </Link>
      ))}
    </div>
  );
}
