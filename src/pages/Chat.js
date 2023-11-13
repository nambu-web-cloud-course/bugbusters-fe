import axios from "axios";
import Container from "../components/common/Container";
import { P, Span } from "../components/common/Text";
import UserInfo from "../components/common/UserInfo";
import formatDate from "../utils/formatDate";
import formatDateTime from "../utils/formatDateTime";
import { useState } from "react";
import ChatRoom from "../components/molecule/ChatRoom";

export default function Chat() {
  const [chatRoom, setChatRoom] = useState([]) 

  // 채팅 온 유저의 데이터 가져오기
  const getData = async (data) => {
    try {
      const res = await axios.get("http://localhost:8080/auth/sign-up", data);
      console.log(`response: ${res.data}`);
    } catch (err) {
      console.log("Chat User Info Get Error", err);
    }
  };

  return (
    <div className="Content">
      <h1>채팅</h1>
      <Container>
        메시지가 없습니다.
      </Container>
      <ChatRoom/>
  <UserInfo />
        <P>채팅 첫 메시지</P>
        <Span>2023-10-11</Span> 
    </div>
  );
}
