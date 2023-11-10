import Container from "../components/atom/Container";
import Button from "../components/atom/Button";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import RegisterBuster from "./RegisterBuster";
import { useState } from "react";

export default function SignUpDetail() {
  const { usertype } = useParams();
  const title = usertype === "user" ? "무서버" : "버스터";

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [hideForm, setHideForm] = useState(false);
  const formDisplay = {
    display: hideForm ? "none" : "block",
  };

  // 폼에 입력한 데이터 서버에 전송
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/auth/sign-up", data);
      const userid = await res.data.userid;

      // 유저 타입에 따라서 이동 페이지 분기
      if (res.data.success && usertype === "user") {
        navigate("/sign-in");
      }
      // 버스터 가입
      else if (res.data.success && usertype === "buster") {
        // 유저 아이디 공통 폼 가리기
        navigate(`/buster?userid=${userid}`);
        setHideForm(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>{title} 회원가입</h1>
      {/* 공통 회원가입 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} style={formDisplay}>
        <Container $size="sm">
          <label htmlFor="userid">아이디</label>
          <input
            {...register("userid", { required: true })}
            defaultValue="test1234"
            id="userid"
            autoFocus
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
          <label htmlFor="gender">성별</label>
          <div className="select">
            <input
              {...register("gender")}
              value="F"
              type="radio"
              id="F"
              defaultChecked
            />
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
          {/* 내일 삭제 */}
          <label htmlFor="sigungu">시군구</label>
          <input {...register("sigungu")} defaultValue="서울시" />
          <label htmlFor="usertype">유저타입</label>
          <input {...register("usertype")} defaultValue="C" />
          {hideForm && <RegisterBuster />}
          <Button color="green" size="lg" fullwidth>
            {usertype === "user" ? "회원가입" : "개인정보 입력(1 / 2)"}
          </Button>
        </Container>
      </form>
    </div>
  );
}
