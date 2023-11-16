import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import formatDateTime from "../../utils/formatDateTime";
import Container from "../common/Container";
import Button from "../common/Button";
import { P } from "../common/Text";
import axios from "axios";
import { GapItems } from "../common/Items";
import UserInfo from "../common/UserInfo";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

// 버스터 -> 무서버 채팅하기 버튼 클릭시 room 생성
export default function RoomAndUsers({ socket, room }) {
  const [roomUsers, setRoomUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  // 로컬 스토리지에서 userid가져오기
  const uid = localStorage.getItem("userid");
  const userid = JSON.parse(uid);
  // 메시지 목록에 띄우기
  const [messagesRecieved, setMessagesReceived] = useState([]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          // message: data.message,
          // username: data.username,
          // __createdtime__: data.__createdtime__,
          message: data.message,
          userid: data.userid,
          createdAt: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const navigate = useNavigate();

  // 방 데이터 가져오기
  const getRooms = async () => {
    let query = "";
    if (usertype == "C") query = `userid=${userid}`;
    else query = `busterid=${userid}`;
    try {
      const res = await axios.get(`http://localhost:8080/chat?${query}`);
      const data = res.data.data;
      setRooms(data);
    } catch (err) {
      console.log("Getting Room list Error", err);
    }
  };

  // 방 안에 있는 유저 저장
  useEffect(() => {
    getRooms();
    socket.on("chatroom_users", (data) => {
      setRoomUsers(data);
      console.log("chatroom_users", data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { userid, room, __createdtime__ });
    navigate("/chat", { replace: true });
  };

  return (
    <div>
      {/* 수정된 부분 */}
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div className={styles.message} key={room.id}>
            <Link to={`/chat/${room.room}`}>
              <P textColor="gray01">
                채팅방 이름: {room.room}
                <br />
                {usertype === "C" ? (
                  <p>보낸 사람: {room.busterid}</p>
                ) : (
                  <p>받는 사람: {room.userid}</p>
                )}
              </P>
              {/* 내가 보낸 채팅 메시지, 시간 */}
            </Link>
          </div>
        ))
      ) : (
        <div className={styles.message}>
          <P textColor="gray01">"채팅 목록이 없습니다."</P>
        </div>
      )}
      {/* 수정된 부분 */}
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
