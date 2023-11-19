import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import Container from "../common/Container";
import GapItems from "../common/GapItems";
import { useState } from "react";
import axios from "axios";

export default function CommonForm({ handleCommonForm }) {
  // URL의 usertype 파라미터 가져오기
  const { usertype } = useParams();
  const isBuster = usertype === "buster" ? true : false;

  ////// SMS 인증 코드 추가
  const [sendSMS, setSendSMS] = useState(false);
  const [smsCode, setSMSCode] = useState("");
  const [authComplete, setAuthComplete] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    setSMSCode(e.target.value);
  };

  // 서버에 휴대폰번호 전송 - 서버는 받은 번호로 인증번호 6자리를 포함한 문자 전송
  const handleSMS = async (data) => {
    try {
      const res = await axios.post("/auth/sms", data);
      if (data.phone === "") alert("휴대폰 번호를 입력하세요.");
      if (res.data.success) {
        console.log("Success Sending Your Phone Number");
      } else {
        console.log("Error sending phon number")
      }
    } catch (err) {
      console.log("Error sending phon number", err);
    }
    setSendSMS(!sendSMS);
  };

  // 문자로 받은 코드 서버에 보내기
  const authCode = async (data) => {
    const code = parseInt(smsCode);
    try {
      const res = await axios.post("/auth/code", {
        data,
        code,
      });
      if (res.data.success) {
        alert("인증 성공");
        setAuthComplete(!authComplete);
      } else alert("다시 인증하세요.");
    } catch (err) {
      console.log("Error sending phone auth code", err);
    }
  };

  // 자동 하이픈 생성 함수
  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber
      ? phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      : "";
  };
  return (
    <form onSubmit={handleSubmit(handleCommonForm)}>
      <Container $size="sm">
        <label htmlFor="userid">아이디</label>
        <input
          {...register("userid", { required: true })}
          defaultValue="a"
          id="userid"
          autoFocus
        />
        <label htmlFor="password">비밀번호</label>
        <input
          {...register("password", { required: true })}
          defaultValue="a"
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
        <GapItems>
          <input
            {...register("phone", { required: true })}
            maxLength={13}
            placeholder="010-1234-5678"
            value={formatPhoneNumber(watch("phone"))}
            id="phone"
            disabled={authComplete}
          />
          <Button
            width="60%"
            color="green"
            size="lg"
            onClick={handleSubmit(handleSMS)}
            style={{ display: authComplete ? "none" : "block" }}
          >
            인증번호 발송
          </Button>
        </GapItems>
        {sendSMS ? (
          <form style={{ display: authComplete ? "none" : "block" }}>
            <GapItems>
              <input
                placeholder="인증번호를 입력하세요."
                id="phone"
                onChange={handleChange}
                maxLength={6}
                value={smsCode}
              />
              <Button
                width="60%"
                color="green"
                size="lg"
                onClick={handleSubmit(authCode)}
              >
                인증
              </Button>
            </GapItems>
          </form>
        ) : null}
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
        <label htmlFor="sigungu">시군구</label>
        <input {...register("sigungu")} defaultValue="양천구" />
        <Button color="green" size="lg" $fullwidth>
          {isBuster ? "개인정보 입력(1 / 2)" : "회원가입"}
        </Button>
      </Container>
    </form>
  );
}
