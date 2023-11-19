import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import GapItems from "../common/GapItems";
import UserInfo from "../common/UserInfo";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import api from "../../api";
import Modal from "../common/Modal";
import { Span } from "../common/Text";
import Badge from "../common/Badge";

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
  const [address, setAddress] = useState("");
  const [completeTradeNum, setCompleteTradeNum] = useState("");
  const [busterprofile, setupBusterProfile] = useState([]);
  const [reviews, setReviews] = useState([]);

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

  const getAddress = async () => {
    try {
      const res = await api.get(`/auth?userid=${muserverid}`);
      if (res.data.success) {
        const addr = res.data.data.addr2;
        setAddress(addr);
      } else {
        console.log("Error fetching address");
      }
    } catch (err) {
      console.log("Error fetching address: ", err);
    }
  };

  const getCompleteTradeNum = () => {
    const arr = [];
    trade.map((item) => {
      item.state === "CP" && arr.push(item);
    });
    setCompleteTradeNum(arr.length);
  };

  const getBusterProfile = async () => {
    try {
      const res = await api.get(`/auth/buster?userid=${busterid}`);
      if (res.data.success) {
        const data = res.data.data;
        setupBusterProfile(data);
      } else {
        console.log("Error fetching buster profile");
      }
    } catch (err) {
      console.log("Error fetching buster profile", err);
    }
  };

  const getReviews = () => {
    let counts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    trade.forEach((item) => {
      if (item.state === "CP" && (item.rev1 || item.rev2 || item.rev3)) {
        counts[item.rev1]++;
        counts[item.rev2]++;
        counts[item.rev3]++;
      }
    });

    setReviews(counts);
  };

  const showReview = () => {
    const reviewCodes = {
      1: "빨라요",
      2: "침착해요",
      3: "시간을 잘 지켜요",
      4: "꼼꼼해요",
      5: "섬세해요",
    };

    const badges = [];
    for (const keyword in reviews) {
      if (reviews[keyword] === 0) continue;
      badges.push(
        <Badge
          key={keyword}
        >{`${reviewCodes[keyword]} ${reviews[keyword]}`}</Badge>
      );
    }
    return badges;
  };

  const handleModal = () => setShowModal(!showModal);

  const leaveRoom = () => {
    if (window.confirm("정말 방을 나가시겠습니까?")) navigate("/chat");
    else navigate(`/chat/${room}`);
    socket.emit("leave_room", { userid, room });
    navigate("/chat", { replace: true });
  };

  // 상단바 버튼 액션
  const sendAddress = () => {
    socket.emit("send_address", { userid, room, address });
  };

  const requestPayment = async (data) => {
    const finalprice = { finalprice: parseInt(data.finalprice) };

    try {
      const res = await api.put(`/trade/${tradeid}`, finalprice);
      if (res.data.succss) {
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

  const showBusterProfile = async () => {};

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
        {renderButton(<FaceRoundedIcon />, "프로필 보기", showBusterProfile)}
        {renderButton(<LocationOnRoundedIcon />, "주소 전송", sendAddress)}
        {renderButton(<CreateRoundedIcon />, "리뷰 작성", () =>
          navigate(`/review/${tradeid}`)
        )}
        {renderButton(<CheckRoundedIcon />, "거래완료", completeTrade)}
      </>
    );
  };

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

  useEffect(() => {
    setRooms(chatroom);
    getTrade();
    getUserInfo();
    getReqData();
    getAddress();
    getCompleteTradeNum();
  }, []);

  useEffect(() => {
    const tid = trade?.[0]?.id;
    if (tid) setTradeID(tid);
  }, [trade]);

  // 버스터 프로필 정보
  useEffect(() => {
    getBusterProfile();
    getTrade();
  }, []);

  useEffect(() => {
    getCompleteTradeNum();
    getReviews();
  }, [trade]);

  useEffect(() => {
    showReview();
  }, [reviews]);

  return (
    <div style={{ borderBottom: "1px solid lightgray" }}>
      <GapItems col="col" style={{ marginBottom: "0.5rem" }}>
        <GapItems>
          <GapItems justify="space-between">
            <Link to={`/request/${reqid}`}>
              <UserInfo
                busterid={busterid}
                userid={muserverid}
                usertype={usertype}
                sido={userinfo?.sido}
                sigungu={userinfo?.sigungu}
                content={request?.content}
                price={request?.price}
                completeTrade={completeTrade}
              />
            </Link>
            <button onClick={leaveRoom}>
              <ExitToAppRoundedIcon />
            </button>
          </GapItems>
          {showModal && (
            <Modal showModal={showModal} setShowProfile={handleModal}>
              <h1>버스터 프로필</h1>
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
