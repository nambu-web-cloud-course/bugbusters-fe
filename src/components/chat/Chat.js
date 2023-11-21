import ChatNavBar from "./ChatNavBar";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import Container from "../common/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat({ socket }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  
  return (
    <>
    {
      token? (
        <Container>
      <ChatNavBar socket={socket} />
      <div>
        <Messages socket={socket} />
        <SendMessage socket={socket} />
      </div>
    </Container>
      ) : (navigate("/"))
    }
    </>
    
  );
}
