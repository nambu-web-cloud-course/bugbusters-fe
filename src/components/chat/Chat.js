import styles from "./styles.module.css";
import ChatNavBar from "./ChatNavBar";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import Container from "../common/Container";

export default function Chat({ username, room, socket }) {
  return (
    <Container>
      <ChatNavBar socket={socket} username={username} room={room} />
      <div>
        <Messages socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </Container>
  );
}
