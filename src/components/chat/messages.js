import formatDateTime from "../../utils/formatDateTime";
import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);
  console.log("messagesRecieved", messagesRecieved)
  
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("receive_message", data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  // 📀 이 부분은 DB 설계하고 수정하기
  // useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    // socket.on("last_100_messages", (last100Messages) => {
      // console.log("Last 100 messages:", JSON.parse(last100Messages));
      // last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
      // last100Messages = sortMessagesByDate(last100Messages);
      // setMessagesReceived((state) => [...last100Messages, ...state]);
    // });
    // return () => socket.off("last_100_messages");
  // }, [socket]);

  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.length > 0 ? (
        messagesRecieved.map((msg, i) => (
          <div className={styles.message} key={i}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className={styles.msgMeta}>
                {formatDateTime(msg.__createdtime__)}
              </span>
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
