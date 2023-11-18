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
import Modal from "../common/Modal";

export default function ChatNavBar({ socket }) {
  const [roomUsers, setRoomUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [room, setRoom] = useState("");
  const { chatroom } = useParams();
  const room = chatroom;
  const reqid = chatroom.split("_")[0];
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const navigate = useNavigate();

  useEffect(() => {
    setRooms(chatroom);
  }, []);

  const [messagesRecieved, setMessagesReceived] = useState([]);
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
  useEffect(() => {
    getRooms();
    socket.on("chatroom_users", (data) => {
      setRoomUsers(data);
      console.log("chatroom_users", data);
    });
    return () => socket.off("chatroom_users");
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

  const leaveRoom = () => {
    // 팝업으로 나갈 건지 확인
    socket.emit("leave_room", { userid, room });
    navigate("/chat", { replace: true });
  };

  // 주소 전송 -> 소영님이 올리면 맞추기
  const sendAddress = () => {
    // socket.emit("send_address", {sigungu, ???)}
  };


////////////////////////////////////////////////////////////////////////

  const [price, setPrice] = useState("");

  const writeReview = async () => {
    const res = await api.put(`/trade/${reqid}`, {
      rev1: "1",
      rev2: "2",
      rev3: "3",
    });
    console.log(res.data.data);
  };

  const setFinalPrice = () => {

  }
  const requestPayment = async () => {
    setShowModal(!showModal);
    // 입력 후 버튼 클릭시 setFinalPrice
    // socket.emit("request_payment", { userid, room, finalprice });
  };

  const completeTrade = () => {};

  const handleInputChange = (e) => {
    setPrice(e.target.value.replace(/,/g, ""));
  };

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
      {showModal ? (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title={"주문서"}
        >
          <GapItems col="col" left="left">
            <label htmlFor="price">최종금액</label>
            <GapItems>
              <input
                id="price"
                value={price}
                onChange={handleInputChange}
                onBlur={() => setPrice(Number(price).toLocaleString())}
              />
              원
            </GapItems>
            <Button color="green" size="lg" onClick={setFinalPrice}>
              결제 요청
            </Button>
          </GapItems>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
