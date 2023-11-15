import Container from "../components/common/Container";
import Button from "../components/common/Button";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function MyPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 데이터 서버에 전송
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // 마이페이지 정보 수정
      const res = await axios.put(
        "http://localhost:8080/auth/mypage",
        data
      );
    } catch (err) {
      console.log("MyPage Edit", err);
    }
  };

  return (
    <div className="Content">
      <h1>마이페이지</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container $size="sm">
          {/* defaultValue로 저장된 유저 정보를 넣는다. */}
          <label htmlFor="userid">아이디</label>
          <input
            {...register("userid", { required: true })}
            defaultValue="test1234"
            id="userid"
          />
          <label htmlFor="password">비밀번호</label>
          <input
            {...register("password", { required: true })}
            defaultValue="Pass1234!"
            id="password"
          />
          <label htmlFor="name">이름</label>
          <input
            {...register("name", { required: true })}
            defaultValue="홍길동"
            id="name"
          />
          <label htmlFor="birthdate">생년월일</label>
          <input
            {...register("birthdate", { required: true })}
            defaultValue="19901231"
            id="birthdate"
          />
          <label htmlFor="phone">휴대폰번호</label>
          <input
            {...register("phone", { required: true })}
            defaultValue="010-1234-5678"
            id="phone"
          />
           <label htmlFor="birthdate">성별</label>
           <div className="select">
            <input {...register("gender")} value="F" type="radio" id="F" />
            <label htmlFor="F">여자</label>
            <input {...register("gender")} value="M" type="radio" id="M" />
            <label htmlFor="M">남자</label>
          </div>
          <label htmlFor="addr1">주소</label>
          <input
            {...register("addr1", { required: true })}
            defaultValue="선릉로120"
          />
          <label htmlFor="addr2">상세주소</label>
          <input
            {...register("addr2", { required: true })}
            defaultValue="11-1234"
          />
          <label htmlFor="zipcode">우편번호</label>
          <input
            {...register("zipcode", { required: true })}
            defaultValue="12345"
          />
          <label htmlFor="sido">서울시</label>
          <input {...register("sido")} defaultValue="서울시" />
          <label htmlFor="sigungu">시군구</label>
          <input {...register("sigungu")} defaultValue="양천구" />
          <Button color="green" size="lg" fullwidth>
            정보 수정
          </Button>
          <Button color="green" size="lg" outline fullwidth>
            회원 탈퇴
          </Button>
        </Container>
      </form>
    </div>
  );
}
