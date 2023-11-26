import Container from "../components/common/Container";
import UserInfo from "../components/common/UserInfo";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Span } from "../components/common/Text";
import formatDateTime from "../utils/formatDateTime";
import api from "../api";
import Badge from "../components/common/Badge";
import GapItems from "../components/common/GapItems";

export default function ChatList({ socket }) {
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [chatroom, setChatRoom] = useState([]);
  const [userinfo, setUserInfo] = useState([]);
  const [request, setRequest] = useState([]);
  const [busterprofile, setBusterProfile] = useState([]);

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

  const getBusterProfile = async () => {
    try {
      const busters = [];
      for (let i = 0; i < chatroom.length; i++) {
        if (chatroom[i] && chatroom[i].busterid) {
          const res = await api.get(`/auth/buster?userid=${chatroom[i].busterid}`);
          if (res.data.success) {
            const data = res.data.data;
            busters.push(data);
          } else {
            console.log("Error fetching buster profile");
          }
        }
      }
      setBusterProfile(busters);
    } catch (err) {
      console.log("Error fetching buster profile", err);
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
  const handleList = (room) => {
    socket.emit("join_room", { userid, room });
  };

  useEffect(() => {
    getChatRoom();
  }, []);

  useEffect(() => {
    getUserInfo();
    getReqData();
    getBusterProfile();
  }, [chatroom]);

  return (
    <>
      {token ? (
        <div className="Wrapper">
          <div className="Content">
            <h1>채팅</h1>
            {chatroom.length > 0 ? (
              <GapItems $col $left>
                {chatroom
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
                          tradecount={busterprofile[idx]?.tradecount}
                          profile={busterprofile[idx]?.profile}
                        />
                        <Span>{formatDateTime(room.createdAt)}</Span>
                      </Container>
                    </Link>
                  ))}
              </GapItems>
            ) : (
              <Container>채팅 방이 없습니다.</Container>
            )}
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
