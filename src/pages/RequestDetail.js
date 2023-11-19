import Container from "../components/common/Container";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import formatDateTime from "../utils/formatDateTime";
import { P, Span } from "../components/common/Text";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import api from "../api";
import GapItems from "../components/common/GapItems";

export default function RequestDetail({ socket }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [room, setRoom] = useState(""); // 방 이름
  const [chatroom, setChatRoom] = useState([]); // 채팅방 정보
  // const [disabledBtn, setDisabledBtn] = useState(false);

  const userid = JSON.parse(localStorage.getItem("userid"));
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const { id } = useParams();
  const reqid = parseInt(id); // 요청 아이디
  const req_userid = data.userid; // 요청한 유저 아이디

  const getData = async () => {
    try {
      const res = await api.get(`/request/${reqid}`);
      if (res.data.success) {
        const data = await res.data.data;
        setData(data);
        setImage(data.Images);
      }
    } catch (err) {
      console.error("Error fetching request detail: ", err);
    }
  };

  const getChatRoom = async () => {
    try {
      const res = await api.get(`/chat?reqid=${reqid}`);
      const data = res.data.data;
      setChatRoom(data);
    } catch (err) {
      console.log("Error getting room list", err);
    }
  };

  // 뒤로가기
  const goBack = () => {
    navigate(-1);
  };

  const cancelRequest = async () => {
    if (window.confirm("정말 요청을 취소하시겠습니까?")) {
      navigate("/trade-list");
    }
    const data = {
      state: "CA",
    };
    try {
      const res = await api.put(`/request/${reqid}`, data);
      if (res.data.success) console.log("Success cancleling request");
    } catch (err) {
      console.log("Error canceling request", err);
    }
  };

  const joinRoom = async () => {
    const data = {
      userid: req_userid,
      busterid: userid,
      reqid: reqid,
    };

    // 거래 생성
    try {
      const res = await api.post("/trade", data);
      if (res.data.success) console.log("Success Create trade");
    } catch (err) {
      console.log("Fail create trade", err);
    }

    // 채팅방 입장
    await socket.emit("join_room", { userid, room });
    navigate(`/chat/${room}`);
  };

  useEffect(() => {
    getData();
    getChatRoom();
    const roomname = `${reqid}_${req_userid}_${userid}`;
    setRoom(roomname);
  }, [reqid, req_userid, userid]);

  return (
    <div className="Content">
      <Container>
        {image.map((img) => (
          <img
            key={img.id}
            style={{ width: "50%" }}
            // 주소 수정
            src={`http://localhost:8080/${img.img}`}
          />
        ))}
        <p>{data.content}</p>
        <GapItems>
          <Badge>
            <LocationOnRoundedIcon fontSize="small" />
            {data.sido} {data.sigungu}
          </Badge>
          <Badge>
            <PersonRoundedIcon fontSize="small" />
            {data.gender === "F"
              ? "여자"
              : data.gender === "M"
              ? "남자"
              : "성별무관"}
          </Badge>
          <Badge>
            <CreditCardRoundedIcon fontSize="small" />
            {data.price?.toLocaleString()}원
          </Badge>
        </GapItems>
        <Span>
          {formatDateTime(data.createdAt)} | 작성자: {data.userid}
        </Span>
        {usertype === "B" ? (
          <Button
            onClick={joinRoom}
            color="green"
            size="lg"
            $fullwidth
            // disabled={disabledBtn}
          >
            채팅하기
          </Button>
        ) : (
          <Button onClick={cancelRequest} color="green" size="lg" $fullwidth disabled={data.state !== "PR"}>
            요청 취소
          </Button>
        )}
      </Container>
      <Button onClick={goBack} color="green" size="lg" outline $fullwidth>
        목록
      </Button>
    </div>
  );
}
