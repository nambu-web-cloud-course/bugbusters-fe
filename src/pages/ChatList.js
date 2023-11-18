import Container from "../components/common/Container";
import UserInfo from "../components/common/UserInfo";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Span } from "../components/common/Text";
import formatDateTime from "../utils/formatDateTime";
import Messages from "../components/chat/Messages";
import api from "../api";

export default function ChatList({ socket }) {
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const [chatroom, setChatRoom] = useState([]);
  // const [userinfo, setUserInfo] = useState([])

  const getChatRoom = async () => {
    const typeid = usertype === "B" ? "busterid" : "userid";
    const URL = `/chat?${typeid}=${userid}`;

    try {
      const res = await api.get(URL);
      const data = res.data.data;
      if (res.data.success) {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setChatRoom(data);
      }
    } catch (err) {
      console.log("Get Chatroom Error", err);
    }
  };

  // const getUserInfo = async () => {
  //   const typeid = usertype === "B" ? "busterid" : "userid";
  //   const URL = `/chat?${typeid}=${userid}`;

  //   try {
  //     const res = await api.get(URL);
  //     const data = res.data.data;
  //     if (res.data.success) {
  //       data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //       setUserInfo(data);
  //     }
  //   } catch (err) {
  //     console.log("Get UserInfo Error", err);
  //   }
  // };

  useEffect(() => {
    getChatRoom();
  }, []);

  //////// 추가
  const handleList = (room) => {
    socket.emit("join_room", { userid, room });
  };

  return (
    <div className="Content">
      <h1>채팅</h1>
      {chatroom.length > 0 ? (
        chatroom.map((room) => (
          <Link
            to={`/chat/${room.room}`}
            key={room.room}
            onClick={() => handleList(room.room)}
          >
            <Container>
              <UserInfo
                room={room.room}
                busterid={room.busterid}
                userid={room.userid}
                usertype={usertype}
              />
              <Span>{formatDateTime(room.createdAt)}</Span>
            </Container>
          </Link>
        ))
      ) : (
        <Container>채팅 방이 없습니다.</Container>
      )}
    </div>
  );
}
