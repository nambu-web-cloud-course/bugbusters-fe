import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Address from "../common/Address";
import Button from "../common/Button";
import Container from "../common/Container";
import GapItems from "../common/GapItems";
import { useState, useEffect } from "react";
import api from "../../api";
import { Span, P } from "../common/Text";

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

  const handleChange = (e) => {
    setSMSCode(e.target.value);
  };

  console.log(watch())

  // 서버에 휴대폰번호 전송 - 서버는 받은 번호로 인증번호 6자리를 포함한 문자 전송
  const handleSMS = async (data) => {
    try {
      const res = await api.post("/auth/sms", data);
      if (data.phone === "") alert("휴대폰 번호를 입력하세요.");
      if (res.data.success) {
        console.log("Success sending Phone Number");
      } else {
        console.log("Error sending phone number");
      }
    } catch (err) {
      console.log("Error sending phone number", err);
    }
    setSendSMS(!sendSMS);
  };

  // 문자로 받은 코드 서버에 보내기
  const authCode = async (data) => {
    const code = parseInt(smsCode);
    try {
      const res = await api.post("/auth/code", {
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
        <GapItems $col $left>
          <label htmlFor="userid">아이디</label>
          <GapItems $col $left>
            <input
              {...register("userid", { required: true })}
              placeholder="아이디를 입력하세요."
              id="userid"
              autoFocus
            />
            {errors.userid?.type === "required" && (
              <Span $textColor="alert">아이디를 입력해주세요.</Span>
            )}
          </GapItems>
        </GapItems>
        <GapItems $col $left>
          <label htmlFor="password">비밀번호</label>
          <GapItems $col $left>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="영문 대소문자 + 숫자 + 특수문자 8~20자리"
              id="password"
            />
            {errors.password?.type === "required" && (
              <Span $textColor="alert">비밀번호를 입력해주세요.</Span>
            )}
          </GapItems>
        </GapItems>
        <GapItems $col $left>
          <label htmlFor="name">이름</label>
          <GapItems $col $left>
            <input
              {...register("name", { required: true })}
              placeholder="이름을 입력하세요."
              id="name"
            />
            {errors.name?.type === "required" && (
              <Span $textColor="alert">이름을 입력해주세요.</Span>
            )}
          </GapItems>
        </GapItems>
        <GapItems $col $left>
          <label htmlFor="birthdate">생년월일</label>
          <GapItems $col $left>
            <input
              {...register("birthdate", { required: true })}
              id="birthdate"
              type="date"
              data-placeholder="생년월일을 입력해주세요."
              required
              aria-require="true"
            />
            {errors.birthdate?.type === "required" && (
              <Span $textColor="alert">생년월일을 입력해주세요.</Span>
            )}
          </GapItems>
        </GapItems>
        <GapItems $col $left>
          <label htmlFor="phone">휴대폰번호</label>
          <GapItems>
            <input
              {...register("phone", { required: true })}
              maxLength={13}
              placeholder="010-1234-5678"
              value={formatPhoneNumber(watch("phone"))}
              id="phone"
              type="tel"
              disabled={authComplete}
            />
            <Button
              $width="50%"
              $color="green"
              $size="lg"
              onClick={handleSubmit(handleSMS)}
              style={{ display: authComplete ? "none" : "block" }}
            >
              인증번호 발송
            </Button>
          </GapItems>
          {errors.phone?.type === "required" && (
            <Span $textColor="alert">휴대폰 인증을 진행하세요.</Span>
          )}
        </GapItems>
        {sendSMS ? (
          <form style={{ display: authComplete ? "none" : "block" }}>
            <GapItems>
              <input
                placeholder="인증번호를 입력하세요."
                id="phone"
                type="number"
                onChange={handleChange}
                maxLength={6}
                value={smsCode}
              />
              <Button
                $width="50%"
                $color="green"
                $size="lg"
                onClick={handleSubmit(authCode)}
              >
                인증
              </Button>
            </GapItems>
          </form>
        ) : null}
        <GapItems $col $left>
          <label htmlFor="gender">성별</label>
          <div className="select">
            <input
              {...register("gender", { required: true })}
              value="F"
              type="radio"
              id="F"
              defaultChecked
            />
            <label htmlFor="F">여자</label>
            <input {...register("gender")} value="M" type="radio" id="M" />
            <label htmlFor="M">남자</label>
          </div>
        </GapItems>
        <GapItems $col $left>
          <label htmlFor="addr1">주소</label>
          <GapItems>
            <input
              {...register("addr1", { required: true })}
              placeholder="주소를 입력하세요."
              id="addr1"
              value={address?.address}
              setValue={setAddressValue}
            />
            <Address address={address} setAddress={setAddress} />
          </GapItems>
          {errors.addr1?.type === "required" && (
            <Span $textColor="alert">주소를 입력해주세요.</Span>
          )}
        </GapItems>
        <GapItems $col $left>
          <label htmlFor="addr2">상세주소</label>
          <input
            {...register("addr2", { required: true })}
            id="addr2"
            placeholder="상세 주소를 입력하세요."
          />
          {errors.addr2?.type === "required" && (
            <Span $textColor="alert">상세주소를 입력해주세요.</Span>
          )}
        </GapItems>
        <div style={{ display: "none" }}>
          <label htmlFor="zipcode">우편번호</label>
          <input
            setValue={setAddressValue}
            {...register("zipcode", { required: true })}
            value={address?.zonecode}
            id="zipcode"
          />
          <label htmlFor="sido">시도</label>
          <input
            setValue={setAddressValue}
            {...register("sido", { required: true })}
            value={address?.sido}
            id="sido"
          />
          <label htmlFor="sigungu">시군구</label>
          <input
            setValue={setAddressValue}
            {...register("sigungu", { required: true })}
            value={address?.sigungu}
            id="sigungu"
          />
        </div>

        <Button $color="green" $size="lg" $fullwidth>
          {isBuster ? "개인정보 입력(1 / 2)" : "회원가입"}
        </Button>
      </Container>
    </form>
  );
}
