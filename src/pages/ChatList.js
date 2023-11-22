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
  const [trade, setTrade] = useState([]);
  const [completeTrade, setCompleteTrade] = useState("");
  const [reviews, setReviews] = useState([]);

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

  const getTrade = async () => {
    try {
      const res = await api.get(`/trade?userid=${userid}`);
      if (res.data.success) {
        const data = res.data.data;
        setTrade(data);
      } else {
        console.log("Error fetching trade");
      }
    } catch (err) {
      console.log("Error fetching trade", err);
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

  const getCompleteTrade = () => {
    const arr = [];
    trade.map((item) => {
      item.state === "CP" && arr.push(item);
    });
    setCompleteTrade(arr.length);
  };

  const getReviews = () => {
    let counts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    trade.forEach((item) => {
      if (item.state === "CP" && (item.rev1 || item.rev2 || item.rev3)) {
        counts[item.rev1]++;
        counts[item.rev2]++;
        counts[item.rev3]++;
      }
    });

    setReviews(counts);
  };

  const showReview = () => {
    const reviewCodes = {
      1: "빨라요",
      2: "침착해요",
      3: "시간을 잘 지켜요",
      4: "꼼꼼해요",
      5: "섬세해요",
    };

    const badges = [];
    for (const keyword in reviews) {
      if (reviews[keyword] === 0) continue;
      badges.push(
        <Badge
          key={keyword}
        >{`${reviewCodes[keyword]} ${reviews[keyword]}`}</Badge>
      );
    }
    return badges;
  };

  useEffect(() => {
    getChatRoom();
    getTrade();
  }, []);

  useEffect(() => {
    getCompleteTrade();
    getReviews();
  }, [trade]);

  useEffect(() => {
    showReview();
  }, [reviews]);

  useEffect(() => {
    getUserInfo();
    getReqData();
  }, [chatroom]);

  const handleList = (room) => {
    // 수정 필요 ...?
    socket.emit("join_room", { userid, room });
  };

  return (
    <>
      {token ? (
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
                        completeTrade={completeTrade}
                      />
                      <GapItems>{showReview()}</GapItems>
                      <Span>{formatDateTime(room.createdAt)}</Span>
                    </Container>
                  </Link>
                ))}
            </GapItems>
          ) : (
            <Container>채팅 방이 없습니다.</Container>
          )}
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
