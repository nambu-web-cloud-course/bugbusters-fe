import Container from "../components/common/Container";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import axios from "axios";
import formatDateTime from "../utils/formatDateTime";
import { P, Span } from "../components/common/Text";
import { GapItems } from "../components/common/Items";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

export default function RequestDetail({
  room,
  setRoom,
  socket,
}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // request id 게시글
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);

  // URL의 requset id 파라미터 가져오기
  const { id } = useParams();
  const rid = parseInt(id);

  const getData = async () => {
    try {
      const res = await axios.get(`/request/${rid}`);
      if (res.data.success) {
        const data = await res.data.data;
        setData(data);
        setImage(data.Images);
      }
    } catch (err) {
      console.error("Error fetching Request Detail: ", err);
    }
  };

  console.log(data)
  // 상세 요청 데이터 가져오기
  useEffect(() => {
    getData();
  }, []);

  // 로그인한 유저 본인 아이디, 유저 타입(B/C), 요청한 무서버 아이디
  const userid = JSON.parse(localStorage.getItem("userid"));
  const req_userid = data.userid;

  // 방이름 지정
  const roomname = `${rid}_${req_userid}_${userid}`;
  setRoom(roomname);

  console.log("userid", userid, "room", room);

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

  return (
    <div className="Content">
      <Container>
        {image.map((img) => (
          <img
            key={img.id}
            style={{ width: "50%" }}
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
        <Button onClick={joinRoom} color="green" size="lg" $fullwidth>
          채팅하기
        </Button>
      </Container>
      <Button onClick={goBack} color="green" size="lg" outline $fullwidth>
        목록
      </Button>
    </div>
  );
}
