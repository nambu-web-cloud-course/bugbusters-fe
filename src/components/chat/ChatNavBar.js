import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import formatDateTime from "../../utils/formatDateTime";
import Container from "../common/Container";
import Button from "../common/Button";
import { P } from "../common/Text";
import axios from "axios";
import { GapItems } from "../common/Items";
import UserInfo from "../common/UserInfo";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

// 버스터 -> 무서버 채팅하기 버튼 클릭시 room 생성
export default function ChatNavBar({ socket }) {
  // const [roomUsers, setRoomUsers] = useState([]);
  // const [rooms, setRooms] = useState([]);

  // room을 세팅해도 초기화되는 문제 때문에 각각의 컴포넌트에 room 지정
  const { chatroom } = useParams();
  const [room, setRoom] = useState("")
  useEffect(() => {
    setRoom(chatroom);  
  }, []);
  
  const userid = JSON.parse(localStorage.getItem("userid"));  
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("receive_message(msgs)", data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          userid: data.userid,
          createdAt: data.createdAt,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  // 방 데이터 가져오기
  // const getRooms = async () => {
  //   let query = "";
  //   if (usertype === "C") query = `userid=${userid}`;
  //   else query = `busterid=${userid}`;
  //   try {
  //     const res = await axios.get(`/chat?${query}`);
  //     const data = res.data.data;
  //     setRooms(data);
  //   } catch (err) {
  //     console.log("Getting Room list Error", err);
  //   }
  // };

  // 방 안에 있는 유저 저장 - { id: socket.id, userid, room }
  // useEffect(() => {
  //   getRooms();
  //   socket.on("chatroom_users", (data) => {
  //     setRoomUsers(data);
  //     console.log("chatroom_users", data);
  //   });
  //   return () => socket.off("chatroom_users");
  // }, [socket]);

  const leaveRoom = () => {
    socket.emit("leave_room", { userid, room });
    navigate("/chat", { replace: true });
  };

  return (
    <div>
      <GapItems>
        <UserInfo />
        <button onClick={leaveRoom}>
          <ExitToAppRoundedIcon />
        </button>
      </GapItems>
      <Button color="green" size="sm" outline>
        결제 요청
      </Button>
      <hr />
    </div>
  );
}
