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
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import api from "../../api";
import Modal from "../common/Modal";
import { P, Span } from "../common/Text";
import Badge from "../common/Badge";

export default function ChatNavBar({ socket }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { chatroom } = useParams();
  const room = chatroom;
  const [trade, setTrade] = useState([]);
  const [tradeid, setTradeID] = useState("");
  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [request, setRequest] = useState([]);
  const [userinfo, setUserInfo] = useState([]);
  const [busterprofile, setBusterProfile] = useState([]);
  const [reviews, setReviews] = useState([
    {rev: "revcode1",keyword: "빠른"},
    {rev: "revcode2",keyword: "침착한"},
    {rev: "revcode3",keyword: "친절한"},
    {rev: "revcode4",keyword: "꼼꼼한"},
    {rev: "revcode5",keyword: "터프한"},
  ]);
  

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

  const getBusterProfile = async () => {
    try {
      const res = await api.get(`/auth/buster?userid=${busterid}`);
      if (res.data.success) {
        const data = res.data.data;
        setBusterProfile(data);
      } else {
        console.log("Error fetching buster profile");
      }
    } catch (err) {
      console.log("Error fetching buster profile", err);
    }
  };

  const handleModal = () => setShowModal(!showModal);
  const handleProfileModal = () => {
    setShowProfile(!showProfile);
  };

  const leaveRoom = () => {
    if (window.confirm("정말 방을 나가시겠습니까?")) navigate("/chat");
    else navigate(`/chat/${room}`);
    socket.emit("leave_room", { userid, room });
    navigate("/chat", { replace: true });
  };

  // 상단바 버튼 액션
  const sendAddress = () => {
    socket.emit("send_address", { userid, room });
  };

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
    <Button type="button" $color="green" $size="xs" $outline onClick={onClick}>
      {icon}
      {label}
    </Button>
  );

  const actionButton = () => {
    if (usertype === "B")
      return renderButton(<CreditCardRoundedIcon />, "결제 요청", handleModal);
    return (
      <>
        {renderButton(<FaceRoundedIcon />, "프로필 보기", handleProfileModal)}
        {renderButton(<LocationOnRoundedIcon />, "주소 전송", sendAddress)}
        {renderButton(<CreateRoundedIcon />, "리뷰 작성", () =>
          navigate(`/review/${tradeid}/${busterid}`)
        )}
        {renderButton(<CheckRoundedIcon />, "거래완료", completeTrade)}
      </>
    );
  };

  const showReview = () => {
    return (
      reviews.map((data, idx) => (
        busterprofile?.[data.rev] > 0 && (
          <Badge key={idx}>{data.keyword} {busterprofile?.[data.rev]}</Badge>
        ) 
      ))
    )
  }

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
  }, []);

  useEffect(() => {
    const tid = trade?.[0]?.id;
    if (tid) setTradeID(tid);
  }, [trade]);

  useEffect(() => {
    usertype === "C" && getBusterProfile();
  }, []);

  return (
    <div style={{ borderBottom: "1px solid lightgray" }}>
      <GapItems $col="col" style={{ marginBottom: "0.5rem" }}>
        <GapItems>
          <GapItems style={{ justifyContent: "space-between" }}>
            <Link to={`/request/${reqid}`}>
              <UserInfo
                busterid={busterid}
                userid={muserverid}
                usertype={usertype}
                sido={userinfo?.sido}
                sigungu={userinfo?.sigungu}
                content={request?.content}
                price={request?.price}
                tradecount={userinfo?.tradecount}
                profile={busterprofile?.profile}
              />
            </Link>
            <button onClick={leaveRoom}>
              <ExitToAppRoundedIcon />
            </button>
          </GapItems>
          {showProfile && (
            <Modal
              showModal={showProfile}
              setShowModal={handleProfileModal}
              title="프로필"
            >
              <GapItems $col $gap="1rem">
                <GapItems>
                  <img
                    style={{ width: "100px" }}
                    src={`${busterprofile?.profile}`}
                    alt="Profile"
                  />
                  <GapItems $col $left>
                    <GapItems>
                      <P $fontWeight="700">아이디</P>
                      <p>{busterprofile?.userid}</p>
                    </GapItems>
                    <GapItems>
                      <P $fontWeight="700">지역</P>
                      <p>
                        {userinfo?.sido} {userinfo?.sigungu}
                      </p>
                    </GapItems>
                    <GapItems>
                      <Badge
                        $textColor="darkgreen"
                        $fontWeight="500"
                        $bgColor="transparent"
                        $padding="0"
                      >
                        <BugReportRoundedIcon fontSize="small" />
                        퇴치 건수 {busterprofile?.tradecount}
                      </Badge>
                    </GapItems>
                  </GapItems>
                </GapItems>
                <GapItems $col $left>
                  <P $fontWeight="700">리뷰</P>
                  <GapItems $wrap>{showReview()}</GapItems>
                </GapItems>
                <GapItems $col $left>
                  <P $fontWeight="700">자기소개</P>
                  <p>{busterprofile?.selfintro}</p>
                </GapItems>
                <GapItems $col $left>
                  <P $fontWeight="700">기술</P>
                  <p>{busterprofile?.tech}</p>
                </GapItems>
                <GapItems $col $left>
                  <P $fontWeight="700">퇴치 경험</P>
                  <p>{busterprofile?.exp}</p>
                </GapItems>
                <GapItems $col $left>
                  <P $fontWeight="700">가장 잘 잡는 벌레</P>
                  <p>{busterprofile?.fav}</p>
                </GapItems>
              </GapItems>
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
            <GapItems $col $left>
              <label htmlFor="price">최종금액</label>
              <GapItems>
                <input
                  {...register("finalprice", { required: true })}
                  placeholder="최종 금액을 입력하세요."
                  id="finalprice"
                />
                원
              </GapItems>
              <Button $color="green" $size="lg" type="submit">
                결제 요청
              </Button>
            </GapItems>
          </Modal>
        </form>
      )}
    </div>
  );
}
