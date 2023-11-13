import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Text, CountText, Span, P } from "../components/common/Text";
import { Link, useNavigate } from "react-router-dom";
import ImageUpload from "../components/common/ImageUpload";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import { GapItems } from "../components/common/Items";
import Badge from "../components/common/Badge";
import formatDateTime from "../utils/formatDateTime";
import { useEffect, useState } from "react";

export default function RequestDetail() {
  // userid, usertype 가져오기
  const uid = localStorage.getItem("userid");
  const utype = localStorage.getItem("usertype");
  const userid = JSON.parse(uid);
  const usertype = JSON.parse(utype);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 모든 요청 데이터 가져오기
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/request");
      if (res.data.success) {
        setData(res.data.data);
      } else {
        console.log("Error fetching All Request");
      }
    } catch (err) {
      console.log("Error fetching All Request: ", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // 폼에 입력한 데이터 서버에 전송
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/request", data);
      console.log(res.data);
      if (res.data.success) {
        navigate("/trade-list");
      }
    } catch (err) {
      console.log("Request Post Error", err);
    }
  };

  return (
    <div className="Content">
      <h1>잡아줘요</h1>
      {usertype === "B" ? (
        // 버스터
        data.map((item) => (
          // 각 컨테이너 클릭시 상세페이지로 이동
          <Link to={`/request/${item.id}`} key={item.id}>
            <Container key={item.id}>
              <p>{item.content}</p>
              <GapItems>
                <Badge>
                  <LocationOnRoundedIcon fontSize="small" />
                  {item.sido} {item.sigungu}
                </Badge>
                <Badge>
                  <PersonRoundedIcon fontSize="small" />
                  {item.gender}
                </Badge>
                <Badge>
                  <CreditCardRoundedIcon fontSize="small" />
                  {item.price}
                </Badge>
              </GapItems>
              <Span>
                {formatDateTime(item.createdAt)} 😨작성자: {item.userid}
              </Span>
            </Container>
          </Link>
        ))
      ) : (
        // 유저(무서버)
        <form className="Content" onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <input
              style={{ display: "none" }}
              {...register("userid", { required: true })}
              id="userid"
              defaultValue={userid}
            />
            <label htmlFor="content">요청사항</label>
            <textarea
              {...register("content")}
              defaultValue="요청사항"
              id="content"
            />
            <label htmlFor="price">가격</label>
            <input {...register("price")} defaultValue="10000" id="price" />
            <label htmlFor="gender">성별</label>
            <div className="select">
              <input
                {...register("gender")}
                value="A"
                type="radio"
                id="A"
                defaultChecked
              />
              <label htmlFor="A">성별무관</label>
              <input {...register("gender")} value="F" type="radio" id="F" />
              <label htmlFor="F">여자</label>
              <input {...register("gender")} value="M" type="radio" id="M" />
              <label htmlFor="M">남자</label>
            </div>
            <label htmlFor="addr1">주소</label>
            <input {...register("addr1")} defaultValue="주소" />
            <label htmlFor="addr2">상세주소</label>
            <input {...register("addr2")} defaultValue="상세주소" />
            <label htmlFor="zipcode">우편번호</label>
            <input {...register("zipcode")} defaultValue="12345" />
            <label htmlFor="sigungu">시군구</label>
            <input {...register("sigungu")} defaultValue="시군구" />
            <label htmlFor="addr1">이미지</label>
            <ImageUpload />
            <Button color="green" size="lg" fullwidth>
              글 작성
            </Button>
          </Container>
        </form>
      )}
    </div>
  );
}
