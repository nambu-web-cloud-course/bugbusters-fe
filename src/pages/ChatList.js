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
  const [userinfo, setUserInfo] = useState([]);
  const [request, setRequest] = useState([]);


  const getChatRoom = async () => {
    const typeid = usertype === "B" ? "busterid" : "userid";
    const URL = `/chat?${typeid}=${userid}`;

    try {
      const res = await api.get(URL);
      const data = res.data.data;
      if (res.data.success) {
        setChatRoom(data);
      }
    } catch (err) {
      console.log("Error on getting chatroom", err);
    }
  };

  const getUserInfo = async () => {
    try {
      const promises = chatroom.map(async (room) => {
        const targetId = usertype === "B" ? room.userid : room.busterid;
        const res = await api.get(`/auth?userid=${targetId}`);
        return res.data.success ? res.data.data : null;
      });

      const userInfoData = await Promise.all(promises);
      const validUserInfoData = userInfoData.filter((data) => data !== null);
      setUserInfo(validUserInfoData);
    } catch (err) {
      console.log("Error getting userinfo", err);
    }
  };

  const getReqData = async () => {
    try {
      const promises = chatroom.map(async (room) => {
        const res = await api.get(`/request/${room.reqid}`);
        return res.data.success ? res.data.data : null;
      });

      const reqData = await Promise.all(promises);
      const validReqData = reqData.filter((data) => data !== null);
      setRequest(validReqData);
    } catch (err) {
      console.log("Error getting userinfo", err);
    }
  };


  useEffect(() => {
    getChatRoom();
  }, []);

  useEffect(() => {
    getUserInfo();
    getReqData();
  }, [chatroom]);

  const handleList = (room) => {
    // 수정 필요 ...?
    socket.emit("join_room", { userid, room });
  };

  console.log(chatroom, request);
  return (
    <div className="Content">
      <h1>채팅</h1>
      {chatroom.length > 0 ? (
        chatroom
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((room, idx) => (
            <Link
              to={`/chat/${room.room}`}
              key={room.room}
              onClick={() => handleList(room.room)}
            >
              <Container>
                <UserInfo
                  room={room?.room}
                  busterid={room?.busterid}
                  userid={room?.userid}
                  sido={userinfo[idx]?.sido}
                  sigungu={userinfo[idx]?.sigungu}
                  content={request[idx]?.content}
                  price={request[idx]?.price}
                  usertype={usertype}
                />
                {/* 버스터 배지, 키워드 */}
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
