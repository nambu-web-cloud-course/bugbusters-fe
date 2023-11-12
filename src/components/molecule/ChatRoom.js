import React, { useState, useEffect } from "react";
import Container from "../common/Container";
import Button from "../common/Button";
import { P, Span } from "../common/Text";
import { useForm } from "react-hook-form";
import socket from "../../socket";

export default function ChatRoom() {
  const uid = localStorage.getItem("userid");
  const userid = JSON.parse(uid);

  const [chatList, setChatList] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  console.log(chatList);

  const onSubmit = async (data) => {
    const message = await data.message;

    // Clear the input field
    setValue("message", "");

    // Emit the message to the server
    socket.emit("message", { userid, message });
  };

  useEffect(() => {
    console.log("useEffect is mounted");
    const currentMessage = ({ userid, message }) => {
      setChatList((prevChatList) => [...prevChatList, { userid, message }]);
    };

    // Subscribe to socket events when the component mounts
    socket.on("message", currentMessage);

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      socket.off("message", currentMessage);
    };
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const date = `${year}년 ${month}월 ${day}일`;

  return (
    <div className="Content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Span $textAlign="center">{date}</Span>
          <P>아이디: {userid}</P>
          <div style={{ border: "1px solid black" }}>
            {chatList.map((item, idx) => {
              return (
                <div key={idx}>
                  {item.userid}: {item.message}
                </div>
              );
            })}
          </div>
          <div>
            <input
              {...register("message", { required: true })}
              placeholder="메시지를 입력하세요."
            />
          </div>
          <Button color="green" size="lg" fullwidth type="submit">
            메시지 전송
          </Button>
        </Container>
      </form>
    </div>
  );
}
