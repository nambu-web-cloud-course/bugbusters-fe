import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import formatDateTime from "../../utils/formatDateTime";
import Container from "../common/Container";
import Button from "../common/Button";
import { P } from "../common/Text";

// 버스터 -> 무서버 채팅하기 버튼 클릭시 room 생성

export default function RoomAndUsers({ socket, username, room }) {
  const [roomUsers, setRoomUsers] = useState([]);

  // 메시지 목록에 띄우기
  const [messagesRecieved, setMessagesReceived] = useState([]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  const usertype = JSON.parse(localStorage.getItem("usertype"));
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
      <div>
        <h2>채팅방 목록</h2>
        {/* 버스터가 요청한 채팅방 목록 */}
        {/*         
        1. 로그인한 유저만 볼 수 있어야 함
        2. 버스터가 무서버의 요청에 채팅을 걸면 방이 생성됨 
        3. "/chat/:chatroom" 진입시 생성된 방에서 요청글 올린 무서버와 채팅 가능
        4. "/chat" 진입시 버스터가 생성한 채팅방 목록이 남아있음
        */}
        {roomUsers.length > 0 ? (
          // roomUsers가 한 개 이상일 때 채팅방 목록 보여주기
          roomUsers.map((user) => (
            <div className={styles.message} key={user.id}>
              <Link to={`/chat/${user.room}`}>
                <P textColor="gray01">
                  채팅방 이름: {user.room}<br/>
                  보낸 사람: {user.username}
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
      </div>
      <button onClick={leaveRoom}>나가기</button>
    </div>
  );
}
