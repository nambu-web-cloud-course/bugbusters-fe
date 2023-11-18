import formatDateTime from "../../utils/formatDateTime";
import { useState, useEffect, useRef } from "react";
import { P, Span } from "../common/Text";
import styled, { css } from "styled-components";
import  GapItems  from "../common/GapItems";

const MessagesColumn = styled.div`
  height: 60vh;
  overflow: auto;
`;

const Message = styled.div`
  width: 60%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  ${(props) =>
    props.isUser
      ? css`
          background: ${({ theme }) => theme.color.lightgreen};
          color: ${({ theme }) => theme.color.darkgreen};
          margin-left: auto;
        `
      : css`
          background: ${({ theme }) => theme.color.gray01};
          color: black;
        `}
`;

export default function Messages({ socket }) {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);
  const userid = JSON.parse(localStorage.getItem("userid"));
  console.log("messagesRecieved", messagesRecieved);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)
    );
  }

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          userid: data.userid,
          createdAt: data.createdAt,
          isUser: data.userid === userid,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on("last_100_messages", (last100Messages) => {
      console.log("Last 100 messages:", JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });
    return () => socket.off("last_100_messages");
  }, [socket]);

  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  return (
    <MessagesColumn ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <Message key={i} isUser={msg.userid === userid}>
          <GapItems col="col" left="left">
            <Span textColor={msg.userid === userid ? "darkgreen" : "black"}>
              {formatDateTime(msg.createdAt)} | {msg.userid}
            </Span>
            <P>{msg.message}</P>
          </GapItems>
        </Message>
      ))}
    </MessagesColumn>
  );
}
