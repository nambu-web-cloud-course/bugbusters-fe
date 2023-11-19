import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import GapItems from "../common/GapItems";
import UserInfo from "../common/UserInfo";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import api from "../../api";
import Modal from "../common/Modal";

export default function ChatNavBar({ socket }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { chatroom } = useParams();
  const room = chatroom;
  const [trade, setTrade] = useState([]);
  const [tradeid, setTradeID] = useState("");
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [request, setRequest] = useState([]);
  const [userinfo, setUserInfo] = useState([]);
  const reqid = chatroom.split("_")[0];
  const muserverid = chatroom.split("_")[1];
  const busterid = chatroom.split("_")[2];

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

  const getUserInfo = async () => {
    const id = usertype === "B" ? muserverid : busterid;
    try {
      const res = await api.get(`/auth?userid=${id}`);
      if (res.data.success) {
        const userinfo = res.data.data;
        setUserInfo(userinfo);
      } else {
        console.log("Error fetching trade data");
      }
    } catch (err) {
      console.log("Error fetching trade data: ", err);
    }
  };

  const getReqData = async () => {
    try {
      const res = await api.get(`/request/${reqid}`);
      if (res.data.success) {
        const data = await res.data.data;
        setRequest(data);
      }
    } catch (err) {
      console.error("Error fetching request: ", err);
    }
  };

  useEffect(() => {
    setRooms(chatroom);
    getTrade();
    getUserInfo();
    getReqData();
  }, []);

  useEffect(() => {
    const tid = trade?.[0]?.id;
    if (tid) setTradeID(tid);
  }, [trade]);

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

    return () => socket.off("receive_message");
  }, [socket]);

  const leaveRoom = () => {
    if (window.confirm("정말 방을 나가시겠습니까?")) navigate("/chat");
    else navigate(`/chat/${room}`);
    socket.emit("leave_room", { userid, room });
    navigate("/chat", { replace: true });
  };

  const sendAddress = () => {
    // socket.emit("send_address", {sigungu, ???)}
  };

  const handleModal = () => setShowModal(!showModal);

  const requestPayment = async (data) => {
    const finalprice = { finalprice: parseInt(data.finalprice) };

    try {
      const res = await api.put(`/trade/${tradeid}`, finalprice);
      if (res.data.success) {
        console.log("Success sending payment request");
        handleModal();
        socket.emit("request_payment", {
          userid,
          room,
          price: parseInt(data.finalprice),
        });
      }
    } catch (err) {
      console.log("Error sending payment request", err);
    }
  };

  const completeTrade = async () => {
    const data = { state: "CP" };
    socket.emit("complete_trade", { userid, room });

    try {
      const res = await api.put(`/trade/${tradeid}`, data);
      if (res.data.success) console.log("Success complete request");
    } catch (err) {
      console.log("Error complete request", err);
    }
  };

  const renderButton = (icon, label, onClick) => (
    <Button type="button" color="green" size="xs" outline onClick={onClick}>
      {icon}
      {label}
    </Button>
  );

  const actionButton = () => {
    if (usertype === "B")
      return renderButton(<CreditCardRoundedIcon />, "결제 요청", handleModal);
    return (
      <>
        {renderButton(<LocationOnRoundedIcon />, "주소 전송", sendAddress)}
        {renderButton(<CreateRoundedIcon />, "리뷰 작성", () =>
          navigate(`/review/${tradeid}`)
        )}
        {renderButton(<CheckRoundedIcon />, "거래완료", completeTrade)}
      </>
    );
  };

  return (
    <div style={{ borderBottom: "1px solid lightgray" }}>
      <GapItems col="col" style={{ marginBottom: "0.5rem" }}>
        <GapItems>
          <UserInfo
            busterid={busterid}
            userid={muserverid}
            usertype={usertype}
            sido={userinfo?.sido}
            sigungu={userinfo?.sigungu}
            content={request?.content}
            price={request?.price}
          />
          <button onClick={leaveRoom}>
            <ExitToAppRoundedIcon />
          </button>
          {showModal && (
            <Modal showModal={showModal} setShowModal={handleModal}>
              <Button color="green" size="lg" type="button">
                취소
              </Button>
              <Button color="green" size="lg" type="button">
                확인
              </Button>
            </Modal>
          )}
        </GapItems>
        <GapItems>{actionButton()}</GapItems>
      </GapItems>
      {showModal && (
        <form onSubmit={handleSubmit(requestPayment)}>
          <Modal
            showModal={showModal}
            setShowModal={handleModal}
            title={"주문서"}
          >
            <GapItems col="col" left="left">
              <label htmlFor="price">최종금액</label>
              <GapItems>
                <input
                  {...register("finalprice", { required: true })}
                  placeholder="최종 금액을 입력하세요."
                  id="finalprice"
                />
                원
              </GapItems>
              <Button color="green" size="lg" type="submit">
                결제 요청
              </Button>
            </GapItems>
          </Modal>
        </form>
      )}
    </div>
  );
}
