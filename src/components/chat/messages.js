import formatDateTime from "../../utils/formatDateTime";
import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";
import { P, Span } from "../common/Text";

export default function Messages  ({ socket })  {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);
  console.log("messagesRecieved", messagesRecieved);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
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

  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on("last_100_messages", (last100Messages) => {
      console.log("Last 100 messages:", JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
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

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)
    );
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>
              {formatDateTime(msg.createdAt)} | {msg.userid}
            </span>
            <br />
            <br />
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};
 
