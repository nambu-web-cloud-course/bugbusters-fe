import Container from "../components/atom/Container";
import Button from "../components/atom/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import SignUpForm from "../components/organism/SignUpForm";
import RegisterBuster from "./RegisterBuster";

export default function SignUpDetail() {
  const { usertype } = useParams();
  console.log(`usertype: ${usertype}`);
  const title = usertype === "user" ? "무서버" : "버스터";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [hideForm, setHideForm] = useState(false);

  // 폼에 입력한 데이터 서버에 전송
  const onSubmit = async (data) => {
    // 공통 회원가입 폼 제출
    if (!hideForm) {
      try {
        const res = await axios.post(
          "http://localhost:8080/auth/sign-up",
          data
        );
        console.log(`response: ${res.data}`);
        const userid = await res.data.userid;
        console.log(`userid: ${userid}`);

        // 유저 가입 완료시 로그인 페이지로 이동
        if (res.data.success && usertype === "user") {
          navigate("/sign-in");
        }
        // 버스터 가입시 URL 파라미터로 입력한 유저 아이디 넘기기
        else if (res.data.success && usertype === "buster") {
          // 유저 아이디 공통 폼 가리기
          navigate(`/buster?userid=${userid}`);
          setHideForm(true);
        }
      } catch (err) {
        console.log("Common Signup Error", err);
      }
    }
    // 공통 회원가입 폼 가린 후 버스터 폼 제출
    else {
      try {
        const res = await axios.post("http://localhost:8080/auth/buster", data);
        console.log(`Buster Data: ${res.data}`);
        // 버스터 프로필 작성 완료시 로그인 페이지로 이동
        if (res.data.success) {
          navigate("/sign-in");
        }
      } catch (err) {
        console.log("Buster Signup Error", err);
      }
    }
  };

  return (
    <div>
      <h1>{title} 회원가입</h1>
      {/* 공통 회원가입 폼 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container $size="sm">
          {/* hideForm이 true면 안 보여줌, false면 보여줌 */}
          {hideForm ? <RegisterBuster /> : <SignUpForm />}
          {hideForm ? (
            ""
          ) : (
            <Button color="green" size="lg" fullwidth>
              {usertype === "user" ? "회원가입" : "개인정보 입력(1 / 2)"}
            </Button>
          )}
        </Container>
      </form>
    </div>
  );
}
