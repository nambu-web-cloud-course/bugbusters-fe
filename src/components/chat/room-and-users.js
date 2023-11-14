import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";

// 버스터 -> 무서버 채팅하기 버튼 클릭시 room 생성
// socket.emit("join_room", { username, room })

// 무서버/버스터: 버스터 -> 무서버에게 요청한 채팅 목록
const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const navigate = useNavigate();

  // 방 안에 있는 유저 저장
  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      setRoomUsers(data);
      console.log("chatroom_users", data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    navigate("/chat", { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{room}</h2>
      <div>
        {roomUsers.length > 0 && (
          <h5 className={styles.usersTitle}>채팅방 목록</h5>
        )}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            // 클릭시 (`/chat/${room}`) 로 이동
            <div
              style={{
                border: "2px solid black",
                padding: "1rem",
              }}
              // 무서버: 내게 요청한 버스터의 프로필, 이름, 나이, 성별, 퇴치건수, 지역, 리뷰, 채팅메시지, 채팅날짜
              // 버스터: 채팅요청한 사용자의 프로필, 아이디, 요청금액, 지역, 성별, 채팅메시지, 채팅날짜
              key={user.id}
            >
              {user.username}
            </div>
          ))}
        </ul>
      </div>

      <button onClick={leaveRoom}>
        나가기
      </button>
    </div>
  );
};

export default RoomAndUsers;
