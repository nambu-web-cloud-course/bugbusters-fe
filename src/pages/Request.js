import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Text, CountText } from "../components/common/Text";
import { useNavigate } from "react-router-dom";

import ImageUpload from "../components/common/ImageUpload";

export default function Request() {
  // userid 가져오기
  const uid = localStorage.getItem("userid");
  const userid = JSON.parse(uid);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  // 폼에 입력한 데이터 서버에 전송
  const onSubmit = async (data) => {
    try {
      // localStorage면 요청시 헤더에 Bearer 토큰 담는 axios default 값 설정
      // cookie면 자동으로 요청 헤더에 포함시켜 보내므로 설정 필요 X
      const res = await axios.post("http://localhost:8080/request", data);
      if (res.data.success) {
        navigate("/trade-list");
      }
    } catch (err) {
      console.log("Request Post Error", err);
    }
  };

  return (
    <div >
      <form className="Content" onSubmit={handleSubmit(onSubmit)}>
        <h1>잡아줘요</h1>
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
          <FileUpload/>
          <Button color="green" size="lg" fullwidth>
            글 작성
          </Button>
        </Container>
      </form>
    </div>
  );
}
