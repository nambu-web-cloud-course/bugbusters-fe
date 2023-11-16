import formatDateTime from "../../utils/formatDateTime";
import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";
import { P, Span } from "../common/Text";
const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);
  console.log("messagesRecieved", messagesRecieved);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("receive_message(msgs)", data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          userid: data.userid,
          createdAt: data.createdAt,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)
    );
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.length > 0 ? (
        messagesRecieved.map((msg, i) => (
          <div className={styles.message} key={i}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className={styles.msgMeta}>
                {formatDateTime(msg.createdAt)} | {msg.userid}
              </span><br/><br/>
            </div>
            <p className={styles.msgText}>{msg.message}</p>
            <br />
          </div>
        ))
      ) : (
        <h1>"채팅방이 없습니다."</h1>
      )}
    </div>
  );
};

export default Messages;
