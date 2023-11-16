import styles from "./styles.module.css";
import RoomAndUsersColumn from "./room-and-users";
import SendMessage from "./send-message";
import MessagesReceived from "./messages";
const Chat = ({ userid, room, socket }) => {
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsersColumn socket={socket} userid={userid} room={room} />
      <div>
        <MessagesReceived socket={socket} />
        {room ? (
          <SendMessage socket={socket} userid={userid} room={room} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
