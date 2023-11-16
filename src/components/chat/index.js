import styles from "./styles.module.css";
import RoomAndUsersColumn from "./room-and-users";
import SendMessage from "./send-message";
import MessagesReceived from "./messages";
import Container from "../common/Container";

export default function Chat({ username, room, socket }) {
  return (
    <Container>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </Container>
  );
}
