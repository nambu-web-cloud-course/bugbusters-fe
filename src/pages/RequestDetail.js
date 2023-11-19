import Container from "../components/common/Container";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import formatDateTime from "../utils/formatDateTime";
import { P, Span } from "../components/common/Text";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import api from "../api";
import GapItems from "../components/common/GapItems";

export default function RequestDetail({ socket }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [room, setRoom] = useState(""); // 방 이름
  const [chatroom, setChatRoom] = useState([]); // 채팅방 정보
  // const [disabledBtn, setDisabledBtn] = useState(false);

  const userid = JSON.parse(localStorage.getItem("userid")); // 유저아이디
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
      console.error("Error fetching Request Detail: ", err);
    }
  };

  const getChatRoom = async () => {
    try {
      const res = await api.get(`/chat?reqid=${reqid}`);
      const data = res.data.data;
      setChatRoom(data);
    } catch (err) {
      console.log("Getting Room list Error", err);
    }
  };

  // 뒤로가기
  const goBack = () => {
    navigate(-1);
  };

  // 버튼 클릭시 채팅방 생성
  const joinRoom = async () => {
    // 서버에 로그인한 유저아이디, 방 이름 전송
    await socket.emit("join_room", { userid, room });
    navigate(`/chat/${room}`);
  };

  useEffect(() => {
    getData();
    getChatRoom();
    const roomname = `${reqid}_${req_userid}_${userid}`;
    setRoom(roomname);
  }, [reqid, req_userid, userid]);

  // 나중에 버튼 비활성화
  // useEffect(() => {
  // Check the condition for disabling the button
  //   console.log(chatroom[0], chatroom.userid, chatroom.busterid)
  //   if (!chatroom.busterid && !chatroom.userid) {
  //     setDisabledBtn(!disabledBtn);
  //   }
  // }, []);

  return (
    <div className="Content">
      <Container>
        {image.map((img) => (
          <img
            key={img.id}
            style={{ width: "50%" }}
            src={`${img.img}`}
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
            {data.gender}
          </Badge>
          <Badge>
            <CreditCardRoundedIcon fontSize="small" />
            {data.price}
          </Badge>
        </GapItems>
        <Span>
          {formatDateTime(data.createdAt)} 😨작성자: {data.userid}
        </Span>
        <Button
          onClick={joinRoom}
          color="green"
          size="lg"
          $fullwidth
          // disabled={disabledBtn}
        >
          채팅하기
        </Button>
      </Container>
      <Button onClick={goBack} color="green" size="lg" outline $fullwidth>
        목록
      </Button>
    </div>
  );
}
