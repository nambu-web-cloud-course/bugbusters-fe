import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import { P } from "../common/Text";
import GapItems from "../common/GapItems";
import UserInfo from "../common/UserInfo";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import api from "../../api";
import * as PortOne from "@portone/browser-sdk/v2";

export default function ChatNavBar({ socket }) {
  const [roomUsers, setRoomUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const { chatroom } = useParams();

  useEffect(() => {
    setRooms(chatroom);
  }, []);
  const reqid = chatroom.split("_")[0];
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const navigate = useNavigate();

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

  // 방 데이터 가져오기
  const getRooms = async () => {
    let query = "";
    if (usertype === "C") query = `userid=${userid}`;
    else query = `busterid=${userid}`;
    try {
      const res = await api.get(`/chat?${query}`);
      const data = res.data.data;
      setRooms(data);
    } catch (err) {
      console.log("Getting Room list Error", err);
    }
  };

  // 방 안에 있는 유저 저장 - { id: socket.id, userid, room }
  useEffect(() => {
    getRooms();
    socket.on("chatroom_users", (data) => {
      setRoomUsers(data);
      console.log("chatroom_users", data);
    });
    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    socket.emit("leave_room", { userid, room });
    navigate("/chat", { replace: true });
  };

  const sendAddress = () => {
    // socket.emit("send_address", {sigungu, ???)}
  };

  const writeReview = async () => {
    const res = await api.put(`/trade/${reqid}`, {
      rev1: "1",
      rev2: "2",
      rev3: "3",
    });
    console.log(res.data.data);
  };

  // 리뷰: 모달? 키워드 5개 넣어서 선택시 value를 데이터에 저장해서 보내기

  const requestPayment = () => {
    PortOne.requestPayment({
      storeId: "store-35891247-52ee-4acc-a88c-8ff8e7b3691d",
      paymentId: "1", 
      // 주문번호는 결제창 요청 시 항상 고유 값으로 채번 되어야 합니다.
      // 결제 완료 이후 결제 위변조 대사 작업시 주문번호를 이용하여 검증이 필요하므로
      // 주문번호는 가맹점 서버에서 고유하게(unique)채번하여 DB에 저장해주세요
      orderName: "버그버스터즈_결제창",
      isTestChannel: true,
      totalAmount: 1,
      customer: {
        customerId: "userid",
        firstName: "김",
        lastName: "철수",
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
  const completeTrade = () => {};

  return (
    <div style={{ borderBottom: "1px solid gray" }}>
      <GapItems col="col">
        <GapItems>
          <UserInfo />
          <button onClick={leaveRoom}>
            <ExitToAppRoundedIcon />
          </button>
        </GapItems>
        {usertype === "B" ? (
          <GapItems left="left">
            <Button color="green" size="xs" outline onClick={requestPayment}>
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
            <Button color="green" size="xs" outline onClick={writeReview}>
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
    </div>
  );
}
