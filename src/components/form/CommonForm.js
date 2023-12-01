import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Address from "../common/Address";
import Button from "../common/Button";
import Container from "../common/Container";
import GapItems from "../common/GapItems";
import { useState, useEffect } from "react";
import api from "../../api";
import { Span, P } from "../common/Text";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
export default function CommonForm({
  handleCommonForm,
  authComplete,
  setAuthComplete,
}) {
  // URL의 usertype 파라미터 가져오기
  const { usertype } = useParams();
  const isBuster = usertype === "buster" ? true : false;

  // 주소 state
  const [address, setAddress] = useState({});

  // SMS 인증 코드
  const [time, setTime] = useState("3:00");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sendSMS, setSendSMS] = useState(false);
  const [smsCode, setSMSCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleCodeChange = (e) => {
    setSMSCode(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); 

    const formattedValue = inputValue.replace(
      /(\d{3})(\d{4})(\d{4})/,
      "$1-$2-$3"
    );

    setPhoneNumber(formattedValue);
    setValue("phone", formattedValue);
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber
      ? phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      : "";
  };

  useEffect(() => {
    if (sendSMS) {
      let minute = 3;
      let second = 0;

      const setCodeTime = setInterval(() => {
        if (second === 0) {
          second = 59;
          minute -= 1;
        } else {
          second -= 1;
        }

        if (minute === 0 && second === 0) {
          clearInterval(setCodeTime);
          alert("유효시간이 만료됐습니다. 인증을 다시 진행해주세요.");
        }

        setTime(`${minute}:${second < 10 ? "0" : ""}${second}`);
      }, 1000);

      return () => clearInterval(setCodeTime);
    }
  }, [sendSMS]);

  // 서버에 휴대폰번호 전송 - 서버는 받은 번호로 인증번호 6자리를 포함한 문자 전송
  const handleSMS = async (phoneNumber) => {
    const data = {
      phone: phoneNumber,
    };
    try {
      const phoneNumber = parseInt(data.phone)
      const isPhoneExist = await api.get(`/auth/isexist?phone=${phoneNumber}`)
      if (isPhoneExist.data.data) {
        alert("중복된 휴대폰 번호입니다.")
        return;
      }
      
      const res = await api.post("/auth/sms", data);
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
  const authCode = async (phone) => {
    const code = parseInt(smsCode);
    try {
      const res = await api.post("/auth/code", {
        phone,
        code,
      });
      console.log(res.data)
      if (res.data.success) {
        alert("인증 성공");
        setAuthComplete(!authComplete);
      } else if (res.data.message === "Expired" && !res.data.success) {
        alert("유효시간이 지났습니다. 다시 인증해주세요.");
      } else alert("잘못된 인증 번호입니다. 다시 인증해주세요.");
    } catch (err) {
      console.log("Error sending phone auth code", err);
    }
  };

  const setPassword = () => {
    setShowPassword(!showPassword);
    showPassword ? setPasswordType("password") : setPasswordType("text");
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
              {...register("userid", {
                required: {
                  value: true,
                  message: "아이디를 입력해주세요.",
                },
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: "영문 또는 숫자만 입력해주세요.",
                },
                minLength: {
                  value: 4,
                  message: "최소 4자 이상 입력해주세요.",
                },
                maxLength: {
                  value: 15,
                  message: "최대 15자까지 입력 가능합니다.",
                },
              })}
              placeholder="아이디를 입력하세요."
              id="userid"
              autoFocus
            />
            {errors.userid && (
              <Span $textColor="alert">{errors.userid.message}</Span>
            )}
          </GapItems>
        </GapItems>
        <GapItems $col $left>
          <label htmlFor="password">비밀번호</label>
          <GapItems $col $left>
            <GapItems>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "비밀번호를 입력해주세요.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/,
                    message: "영문 + 숫자 + 특수문자를 입력해주세요.",
                  },
                  minLength: {
                    value: 8,
                    message: "최소 8자 이상 입력해주세요.",
                  },
                  maxLength: {
                    value: 20,
                    message: "최대 20자까지 입력 가능합니다.",
                  },
                })}
                type={passwordType}
                placeholder="영문 + 숫자 + 특수문자 8~20자리"
                id="password"
              />
              <button
                type="button"
                onClick={setPassword}
                style={{ color: "gray" }}
              >
                {showPassword ? (
                  <VisibilityOffRoundedIcon fontSize="small" />
                ) : (
                  <RemoveRedEyeRoundedIcon fontSize="small" />
                )}
              </button>
            </GapItems>
            {errors.password && (
              <Span $textColor="alert">{errors.password.message}</Span>
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
              data-placeholder="생년월일을 입력하세요."
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
              placeholder="'-' 빼고 입력"
              onChange={handlePhoneNumber}
              value={formatPhoneNumber(watch("phone"))}
              id="phone"
              type="tel"
              disabled={authComplete}
            />
            <Button
              $width="50%"
              $color="green"
              $size="lg"
              onClick={() => handleSMS(phoneNumber)}
              style={{ display: authComplete ? "none" : "block" }}
              disabled={!watch("phone")}
              type="button"
            >
              인증번호 발송
            </Button>
          </GapItems>
          {errors.phone?.type === "required" && (
            <Span $textColor="alert">휴대폰 인증을 진행해주세요.</Span>
          )}
        </GapItems>
        {sendSMS && (
          <div style={{ display: authComplete ? "none" : "block" }}>
            <GapItems>
              <input
                placeholder="인증번호를 입력하세요."
                id="phone"
                onChange={handleCodeChange}
                maxLength={6}
                value={smsCode}
              />
              <Button
                $width="50%"
                $color="green"
                $size="lg"
                type="button"
                onClick={() => authCode(phoneNumber)}
              >
                인증
              </Button>
            </GapItems>
            <Span $textColor="alert">{time}</Span>
          </div>
        )}
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
            <Address setAddress={setAddress} />
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
