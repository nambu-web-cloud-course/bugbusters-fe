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
  // 채팅방 정보
  // const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const [roomUsers, setRoomUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 메시지 정보
  const [messagesRecieved, setMessagesReceived] = useState([]);

  // URL의 방 이름 가져오기
  const { chatroom } = useParams();
  const room = chatroom;
  const reqid = chatroom.split("_")[0];
  const muserverid = chatroom.split("_")[1];
  const busterid = chatroom.split("_")[2];

  // 로그인한 유저 정보 가져오기
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));

  // 거래 내역 가져오기
  const [trade, setTrade] = useState([]);
  const [tradeid, setTradeID] = useState("");

  const { register, handleSubmit } = useForm();

  const getTrade = async () => {
    try {
      const tradeRes = await api.get(`/trade`);

      if (tradeRes.data.success) {
        const commonTrades = tradeRes.data.data.filter(
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

  useEffect(() => {
    setRooms(chatroom);
    getTrade();
  }, []);

  useEffect(() => {
    const tid = trade?.[0]?.id;
    if (tid) {
      setTradeID(tid);
    }
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

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  // 방 안에 있는 유저 저장 - { id: socket.id, userid, room }
  // useEffect(() => {
  //   getRooms();
  //   socket.on("chatroom_users", (data) => {
  //     setRoomUsers(data);
  //     console.log("chatroom_users", data);
  //   });
  //   return () => socket.off("chatroom_users");
  // }, [socket]);

  // 방 데이터 가져오기
  // const getRooms = async () => {
  //   let query = "";
  //   if (usertype === "C") query = `userid=${userid}`;
  //   else query = `busterid=${userid}`;
  //   try {
  //     const res = await api.get(`/chat?${query}`);
  //     const data = res.data.data;
  //     setRooms(data);
  //   } catch (err) {
  //     console.log("Getting Room list Error", err);
  //   }
  // };

  const leaveRoom = async () => {
    // 취소 눌러도 나가지는데..?
    if (window.confirm("정말 방을 나가시겠습니까?")) {
      navigate("/chat");
    } else {
      navigate(`/chat/${room}`);
    }
    socket.emit("leave_room", { userid, room });
    navigate("/chat", { replace: true });
  };

  // 주소 전송 -> 소영님이 올리면 맞추기
  const sendAddress = () => {
    // socket.emit("send_address", {sigungu, ???)}
  };

  //////////////////////////////////////////////////// 거래 액션

  // 리뷰 작성
  const goReivew = async () => {
    navigate(`/review/${tradeid}`)
  };

  // 결제 요청
  const requestPayment = async (data) => {
    const finalprice = {
      finalprice: parseInt(data.finalprice),
    };

    try {
      const res = await api.put(`/trade/${tradeid}`, finalprice);
      // success로 수정 요청
      if (res.data.succss) {
        console.log("Sending Payment Request Success");
        setShowModal(!showModal);
        socket.emit("request_payment", {
          userid,
          room,
          price: parseInt(data.finalprice),
        });
      }
    } catch (err) {
      console.log("Fail Sending Payment Request", err);
    }
  };

  console.log(trade, tradeid);
  // 거래 완료
  const completeTrade = async () => {
    const data = {
      state: "CP",
    };

    socket.emit("complete_trade", { userid, room });

    try {
      const res = await api.put(`/trade/${tradeid}`, data);
      if (res.data.success) console.log("Success complete request");
    } catch (err) {
      console.log("Error on complete request", err);
    }
  };

  return (
    <div style={{ borderBottom: "1px solid lightgray" }}>
      <GapItems col="col" style={{ marginBottom: "1rem" }}>
        <GapItems>
          <UserInfo />
          <button onClick={leaveRoom}>
            <ExitToAppRoundedIcon />
          </button>
          {showModal && (
            <Modal showModal={showModal} setShowModal={setShowModal}>
              <Button color="green" size="lg" type="button">
                취소
              </Button>
              <Button color="green" size="lg" type="button">
                확인
              </Button>
            </Modal>
          )}
        </GapItems>
        {usertype === "B" ? (
          <GapItems left="left">
            <Button
              type="button"
              color="green"
              size="xs"
              outline
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              <CreditCardRoundedIcon />
              결제 요청
            </Button>
          </GapItems>
        ) : (
          <GapItems>
            <Button color="green" size="xs" outline onClick={sendAddress}>
              <LocationOnRoundedIcon />
              주소 전송
            </Button>
            <Button color="green" size="xs" outline onClick={goReivew}>
              <CreateRoundedIcon />
              리뷰 작성
            </Button>
            <Button color="green" size="xs" outline onClick={completeTrade}>
              <CheckRoundedIcon />
              거래완료
            </Button>
          </GapItems>
        )}
      </GapItems>
      {showModal && (
        <form onSubmit={handleSubmit(requestPayment)}>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
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
