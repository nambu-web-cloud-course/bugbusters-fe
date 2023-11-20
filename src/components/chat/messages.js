import formatDateTime from "../../utils/formatDateTime";
import { useState, useEffect, useRef } from "react";
import { P, Span } from "../common/Text";
import styled, { css } from "styled-components";
import GapItems from "../common/GapItems";
import Button from "../common/Button";
import * as PortOne from "@portone/browser-sdk/v2";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import api from "../../api";

const BUSTER_BOT = "BugBusters_Official";

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
  ${(props) =>
    props.isOfficial &&
    css`
      background: white;
      border: 2px solid ${({ theme }) => theme.color.green};
      margin-left: 0 auto;
    `}
`;

export default function Messages({ socket }) {
  const navigate = useNavigate();
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [trade, setTrade] = useState([]);
  const [tradeid, setTradeID] = useState("");
  const [finalprice, setFinalPrice] = useState("");
  const messagesColumnRef = useRef(null);

  const { chatroom } = useParams();
  const room = chatroom;
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));

  // URL 파라미터 아이디
  const reqid = chatroom.split("_")[0];
  const muserverid = chatroom.split("_")[1];
  const busterid = chatroom.split("_")[2];

  // 데이터 가져오기
  const getTrade = async () => {
    try {
      const res = await api.get("/trade");

      if (res.data.success) {
        const commonTrades = res.data.data.filter(
          (trade) =>
            trade.reqid == reqid &&
            trade.userid === muserverid &&
            trade.busterid === busterid
        );
        setTrade(commonTrades);
      } else {
        console.log("Error fetching trade data");
      }
    } catch (err) {
      console.log("Error fetching trade data: ", err);
    }
  };

  const getFinalPrice = async () => {
    try {
      const res = await api.get(`/trade/${tradeid}`);
      if (res.data.success) {
        const price = res.data.data.finalprice;
        setFinalPrice(price);
      }
    } catch (err) {
      console.log("Error fetching trade data: ", err);
    }
  };

  console.log("messagesRecieved", messagesRecieved);

  const payment = () => {
    const uuid = uuidv4();

    PortOne.requestPayment({
      storeId: "store-35891247-52ee-4acc-a88c-8ff8e7b3691d",
      paymentId: `${uuid}`,
      // 주문번호는 가맹점 서버에서 고유하게(unique)채번하여 DB에 저장해주세요
      orderName: "버그버스터즈_결제창",
      isTestChannel: true,
      totalAmount: finalprice,
      customer: {
        customerId: "userid",
        fullName: "userName",
        phoneNumber: "010-1234-5678",
        birthYear: "1990",
        birthMonth: "10",
        birthDay: "20",
      },
      currency: "CURRENCY_KRW",
      pgProvider: "PG_PROVIDER_KAKAOPAY",
      payMethod: "EASY_PAY",
    });
    PortOne.requestIssueBillingKey({
      issueName: "CREATE_BILLING_KEY",
    });
  };

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

  useEffect(() => {
    getTrade();
  }, []);

  useEffect(() => {
    const tid = trade?.[0]?.id;
    if (tid) setTradeID(tid);
  }, [trade]);

  useEffect(() => {
    getFinalPrice();
  }, [tradeid]);

  console.log(finalprice);

  return (
    <MessagesColumn ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <Message
          key={i}
          isUser={msg.userid === userid}
          isOfficial={msg.userid === BUSTER_BOT}
        >
          <GapItems col="col" left="left">
            {msg.userid === BUSTER_BOT && (
              <GapItems>
                <P textColor="darkgreen">
                  🪲
                  {BUSTER_BOT}
                </P>
              </GapItems>
            )}
            <P>{msg.message}</P>
            {usertype === "C" &&
              msg.message.includes("결제") &&
              msg.userid === BUSTER_BOT && (
                <Button color="green" size="lg" onClick={payment}>
                  {finalprice}원 결제하기
                </Button>
              )}
            {usertype === "C" &&
              msg.message.includes("완료") &&
              msg.userid === BUSTER_BOT && (
                <Button
                  color="green"
                  size="lg"
                  onClick={() => {
                    navigate(`/review/${tradeid}`);
                  }}
                >
                  리뷰 작성
                </Button>
              )}
            <Span textColor={msg.userid === userid ? "darkgreen" : "black"}>
              {formatDateTime(msg.createdAt)}
            </Span>
          </GapItems>
        </Message>
      ))}
    </MessagesColumn>
  );
}
