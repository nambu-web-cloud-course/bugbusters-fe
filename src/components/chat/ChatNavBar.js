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
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

export default function ChatNavBar({ socket }) {
  const [roomUsers, setRoomUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const { chatroom } = useParams();

  useEffect(() => {
    setRooms(chatroom);
  }, []);
  const reqid = chatroom.split("_")[0];
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
  const getRooms = async () => {
    let query = "";
    if (usertype === "C") query = `userid=${userid}`;
    else query = `busterid=${userid}`;
    try {
      const res = await axios.get(`/chat?${query}`);
      const data = res.data.data;
      setRooms(data);
    } catch (err) {
      console.log("Getting Room list Error", err);
    }
  };

  // 방 안에 있는 유저 저장 - { id: socket.id, userid, room }
  useEffect(() => {
    getRooms();
    socket.on("chatroom_users", (data) => {
      setRoomUsers(data);
      console.log("chatroom_users", data);
    });
    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    socket.emit("leave_room", { userid, room });
    navigate("/chat", { replace: true });
  };

  const sendAddress = () => {
    // socket.emit("send_address", {sigungu, ???)}
  };

  const writeReview = async () => {
    const res = await axios.put(`/trade/${reqid}`, {
      rev1: "1",
      rev2: "2",
      rev3: "3",
    });
    console.log(res.data.data);
  };

  // 리뷰: 모달? 키워드 5개 넣어서 선택시 value를 데이터에 저장해서 보내기

  const completeTrade = () => {};

  return (
    <div style={{ borderBottom: "1px solid gray" }}>
      <GapItems col="col">
        <GapItems>
          <UserInfo />
          <button onClick={leaveRoom}>
            <ExitToAppRoundedIcon />
          </button>
        </GapItems>
        {usertype === "B" ? (
          <GapItems left="left">
            <Button color="green" size="xs" outline>
              <CreditCardRoundedIcon />
              결제 요청
            </Button>
          </GapItems>
        ) : (
          <GapItems>
            <Button color="green" size="xs" outline onClick={sendAddress}>
              <LocationOnRoundedIcon />
              주소 전송
            </Button>
            <Button color="green" size="xs" outline onClick={writeReview}>
              <CreateRoundedIcon />
              리뷰 작성
            </Button>
            <Button color="green" size="xs" outline onClick={completeTrade}>
              <CheckRoundedIcon />
              거래완료
            </Button>
          </GapItems>
        )}
      </GapItems>
    </div>
  );
}
