import Container from "../components/atom/Container";
import Button from "../components/atom/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Text, CountText } from "../components/atom/Text";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

export default function Request() {
  const navigate = useNavigate();
  // const { user, login, logout } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 폼에 입력한 데이터 서버에 전송
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:8080/request", data);
      const userid = await res.data.userid;
      if (res.data.success) {
        navigate("reqlist");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(watch());

  return (
    <div>
      {/* 유저: 글 작성 컴포넌트 / 버스터: 글 목록 리스트 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>잡아줘요</h1>
        <Container>
          <input
            // style={{ display: "none" }}
            {...register("userid", { required: true })}
            id="userid"
            defaultValue="a"
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

          <Button color="green" size="lg" fullwidth>
            글 작성
          </Button>
        </Container>
      </form>
    </div>
  );
}
