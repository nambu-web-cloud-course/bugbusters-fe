import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Address from "../common/Address";
import Button from "../common/Button";
import Container from "../common/Container";
import GapItems from "../common/GapItems";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CommonForm({ handleCommonForm }) {
  // URL의 usertype 파라미터 가져오기
  const { usertype } = useParams();
  const isBuster = usertype === "buster" ? true : false;

  // 주소 state
  const [address, setAddress] = useState({});

  // SMS 인증 코드
  const [sendSMS, setSendSMS] = useState(false);
  const [smsCode, setSMSCode] = useState("");
  const [authComplete, setAuthComplete] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  console.log(watch());

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
        console.log("Error sending phon number");
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

  const setAddressValue = () => {
    setValue("addr1", address.address);
    setValue("sido", address.sido);
    setValue("sigungu", address.sigungu);
    setValue("zipcode", address.zonecode);
  };

  useEffect(() => {
    setAddressValue();
  }, [address]);

  return (
    <form onSubmit={handleSubmit(handleCommonForm)}>
      <Container $size="sm">
        <label htmlFor="userid">아이디</label>
        <input
          {...register("userid", { required: true })}
          placeholder="아이디를 입력하세요."
          id="userid"
          autoFocus
        />
        <label htmlFor="password">비밀번호</label>
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="영문, 숫자, 특수문자 포함 8~16자리"
          id="password"
        />
        <label htmlFor="name">이름</label>
        <input
          {...register("name", { required: true })}
          placeholder="이름을 입력하세요."
          id="name"
        />
        <label htmlFor="birthdate">생년월일</label>
        <input
          {...register("birthdate", { required: true })}
          placeholder="예) 19901231"
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
            width="50%"
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
                width="50%"
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
        <GapItems>
          <input
            {...register("addr1", { required: true })}
            placeholder="주소를 입력하세요."
            value={address?.address}
            setValue={setAddressValue}
          />
          <Address address={address} setAddress={setAddress} />
        </GapItems>
        <label htmlFor="addr2">상세주소</label>
        <input
          {...register("addr2", { required: true })}
          placeholder="상세 주소를 입력하세요."
        />
        <div style={{ display: "none" }}>
          <label htmlFor="zipcode">우편번호</label>
          <input
            setValue={setAddressValue}
            {...register("zipcode", { required: true })}
            value={address?.zonecode}
          />
          <label htmlFor="sido">시도</label>
          <input
            setValue={setAddressValue}
            {...register("sido")}
            value={address?.sido}
          />
          <label htmlFor="sigungu">시군구</label>
          <input
            setValue={setAddressValue}
            {...register("sigungu")}
            value={address?.sigungu}
          />
        </div>

        <Button color="green" size="lg" $fullwidth>
          {isBuster ? "개인정보 입력(1 / 2)" : "회원가입"}
        </Button>
      </Container>
    </form>
  );
}
