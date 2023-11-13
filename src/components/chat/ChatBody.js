import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    // localStorage.removeItem("userName")
    navigate("/request");
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <Button onClick={()=>{navigate('/chat')}} color="green" size="lg" >
          채팅 목록
        </Button>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          나가기
        </button>
      </header>
      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
