import ChatNavBar from "./ChatNavBar";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import Container from "../common/Container";
import { useState } from "react";

export default function Chat({ socket }) {
  return (
    <Container>
      <ChatNavBar socket={socket} />
      <div>
        <Messages socket={socket} />
        <SendMessage socket={socket} />
      </div>
    </Container>
  );
}
