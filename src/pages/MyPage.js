import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "../api";
import GapItems from "../components/common/GapItems";
import { Span } from "../components/common/Text";
import Address from "../components/common/Address";

export default function MyPage() {
  const userid = JSON.parse(localStorage.getItem("userid"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [sendSMS, setSendSMS] = useState(false);
  const [smsCode, setSMSCode] = useState("");
  const [authComplete, setAuthComplete] = useState(false);
  const [address, setAddress] = useState({});
  const [modifyPhone, setModifyPhone] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    setSMSCode(e.target.value);
  };

  // 회원가입시 기입한 유저 정보 가져오기
  const getData = async () => {
    try {
      const res = await api.get(`/auth?userid=${userid}`);
      const userData = res.data.data;
      setData(userData);
      setValue("phone", userData.phone);
      setValue("addr1", userData.addr1);
      setValue("addr2", userData.addr2);
      setValue("zipcode", userData.zipcode);
      setValue("sigungu", userData.sigungu);
    } catch (err) {
      console.log("MyPage Edit Error", err);
    }
  };

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

  const onSubmit = async (data) => {
    try {
      const res = await api.put(`/auth/${userid}`, data);
      if (res.data.succss) alert("수정 성공");
    } catch (err) {
      console.log("MyPage Edit", err);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber
      ? phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      : "";
  };

  const setAddressValue = () => {
    setValue("addr1", address?.address);
    setValue("sigungu", address?.sigungu);
    setValue("zipcode", address?.zonecode);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setAddressValue();
  }, [address]);

  console.log(watch());

  return (
    <>
      {token ? (
        <div className="Content">
          <h1>마이페이지</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container $size="sm">
              <label htmlFor="userid">아이디 </label>
              <input id="userid" value={data.userid} disabled />
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                value={"********"}
                type="password"
                disabled
              />
              <label htmlFor="name">이름</label>
              <input id="name" value={data.name} disabled />
              <label htmlFor="birthdate">생년월일</label>
              <input id="birthdate" value={data.birthdate} disabled />
              <GapItems $col $left>
                <label htmlFor="phone">휴대폰번호</label>
                <GapItems>
                  <input
                    {...register("phone", { required: true })}
                    maxLength={13}
                    placeholder="'-' 빼고 입력"
                    value={formatPhoneNumber(watch("phone"))}
                    id="phone"
                    type="tel"
                    disabled={!modifyPhone}
                  />
                  {modifyPhone ? (
                    <Button
                      $width="50%"
                      $color="green"
                      $size="lg"
                      onClick={handleSubmit(handleSMS)}
                      type="button"
                      style={{ display: authComplete ? "none" : "block" }}
                    >
                      인증번호 발송
                    </Button>
                  ) : (
                    <Button
                      $width="20%"
                      $color="green"
                      $size="lg"
                      type="button"
                      onClick={() => {
                        setModifyPhone(!modifyPhone);
                      }}
                    >
                      수정
                    </Button>
                  )}
                </GapItems>
                {errors.phone?.type === "required" && (
                  <Span $textColor="alert">휴대폰 인증을 진행해주세요.</Span>
                )}
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
              <label htmlFor="birthdate">성별</label>
              <div className="select">
                <input
                  value="F"
                  type="radio"
                  id="F"
                  disabled
                  checked={data.gender === "F"}
                />
                <label htmlFor="F">여자</label>
                <input
                  value="M"
                  type="radio"
                  id="M"
                  disabled
                  checked={data.gender === "M"}
                />
                <label htmlFor="M">남자</label>
              </div>
              <GapItems $col $left>
                <label htmlFor="addr1">주소</label>
                <GapItems>
                  <input
                    {...register("addr1")}
                    placeholder="주소를 입력하세요."
                    id="addr1"
                    value={address?.address}
                  />
                  <Address
                    setAddressValue={setAddressValue}
                    setAddress={setAddress}
                  />
                </GapItems>
              </GapItems>
              <GapItems $col $left>
                <label htmlFor="addr2">상세주소</label>
                <input
                  {...register("addr2")}
                  id="addr2"
                  placeholder="상세 주소를 입력하세요."
                />
              </GapItems>
              <div style={{ display: "none" }}>
                <label htmlFor="zipcode">우편번호</label>
                <input
                  {...register("zipcode", { required: true })}
                  value={address?.zonecode}
                  id="zipcode"
                />
                <label htmlFor="sigungu">시군구</label>
                <input
                  {...register("sigungu", { required: true })}
                  value={address?.sigungu}
                  id="sigungu"
                />
              </div>
              <Button $color="green" $size="lg" $fullwidth type="submit">
                정보 수정
              </Button>
            </Container>
          </form>
          <Button $color="green" $size="lg" $outline $fullwidth>
            회원 탈퇴
          </Button>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
