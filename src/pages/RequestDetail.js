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

export default function RequestDetail({socket}) {
  // URL의 requset id 파라미터 가져오기
  const { id } = useParams();
  const rid = parseInt(id);
  // console.log(`Request ID : ${rid}`);

  // 로컬 스토리지에서 userid, usertype 가져오기
  const uid = localStorage.getItem("userid");
  const utype = localStorage.getItem("usertype");

  // request id 게시글
  const [data, setData] = useState([]);

  // 로그인한 유저 본인 아이디, 유저 타입(B/C), 요청한 무서버 아이디
  const userid = JSON.parse(uid);
  const usertype = JSON.parse(utype);
  const req_userid = data.userid;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/request/${rid}`);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching Request Detail: ", err);
    }
  };

  // 뒤로가기
  const goBack = () => {
    navigate(-1);
  };

  // 채팅방 이름
  // const [room, setRoom] = useState("");

  // 버튼 클릭시 채팅방 생성
  const joinRoom = async () => {
    const room = `${rid}_${req_userid}_${userid}`;
    console.log("Room Name:", room);
    // 서버에 로그인한 유저아이디, 방 이름 전송
    await socket.emit("join_room", { userid, room, rid, req_userid });
    navigate(`/chat/${room}`);
  };

  // 데이터 가져오기 함수 실행
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Content">
      <Container>
        <h2>업로드한 이미지</h2>
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
        <Button onClick={joinRoom} color="green" size="lg" fullwidth>
          채팅하기
        </Button>
      </Container>
      <Button onClick={goBack} color="green" size="lg" outline fullwidth>
        목록
      </Button>
    </div>
  );
}
