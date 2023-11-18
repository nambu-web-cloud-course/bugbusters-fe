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
import { useForm } from "react-hook-form";

export default function ChatNavBar({ socket }) {
  const [roomUsers, setRoomUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const { chatroom } = useParams();
  const room = chatroom;
  const reqid = chatroom.split("_")[0];
  const req_userid = chatroom.split("_")[1];
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const [data, setData] = useState([]);
  const [trade, setTrade] = useState([]);
  const [messagesRecieved, setMessagesReceived] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getData = async () => {
    try {
      const res = await api.get(`/trade?userid=${req_userid}`);
      if (res.data.success) {
        setData(res.data.data);
      } else {
        console.log("Error fetching All Request");
      }
    } catch (err) {
      console.log("Error fetching All Request: ", err);
    }
  };

  const getTrade = async () => {
    try {
      const filteredData = await data.filter((item) => item.reqid == reqid);
      setTrade(filteredData);
    } catch (err) {
      console.log("Get Trade Error", err);
    }
  };

  useEffect(() => {
    setRooms(chatroom);
    getData();
  }, []);

  useEffect(() => {
    getTrade();
  }, [data]);

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

  const leaveRoom = async () => {
    await setShowModal(!showModal);
    socket.emit("leave_room", { userid, room });
    navigate("/chat", { replace: true });
  };

  // 주소 전송 -> 소영님이 올리면 맞추기
  const sendAddress = () => {
    // socket.emit("send_address", {sigungu, ???)}
  };

  ////////////////////////////////////////////////////////////////////////

  const writeReview = async () => {
    const trade_id = trade[0].id;
    const res = await api.put(`/trade/${trade_id}`, {
      rev1: "1",
      rev2: "2",
      rev3: "3",
    });
    console.log(res.data.data);
  };

  // 결제 요청
  const requestPayment = async (data) => {
    const trade_id = trade[0].id;
    const finalprice = {
      finalprice: parseInt(data.finalprice),
    };

    try {
      const res = await api.put(`/trade/${trade_id}`, finalprice);
      console.log(res.data);
      // success로 수정
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
      console.log("Sending Payment Request Fail", err);
    }
  };

  // 거래 완료
  const completeTrade = () => {};

  return (
    <div style={{ borderBottom: "1px solid gray" }}>
      <GapItems col="col">
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
                  // value={formatPrice(watch("finalprice"))}
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
