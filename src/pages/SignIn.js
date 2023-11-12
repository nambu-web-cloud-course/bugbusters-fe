import Button from "../components/common/Button";
import Container from "../components/common/Container";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignIn() {
  // 유저 아이디, 토큰 저장
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/sign-in",
        data
        //  withCredentials: true, // cookie 사용시
      );

      if (res.data.success) {
        console.log("Sign in Success", res.data);
        const userid = res.data.userid;
        const token = res.data.token;

        // cookie version
        // 자동으로 요청 헤더에 포함시켜 보내므로 설정 필요 X

        // localStorage version
        localStorage.setItem("userid", JSON.stringify(userid));
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/request");
      }
    } catch (err) {
      console.log("Signin Erorr", err);
    }
  };

  return (
    <div className="Content">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container $size="sm">
          <label htmlFor="userid">아이디</label>
          <input
            {...register("userid", { required: true })}
            placeholder={"아이디를 입력하세요."}
            id="userid"
            fullwidth
            autoFocus
          />
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder={"비밀번호를 입력하세요."}
            id="password"
            fullwidth
          />
          <Button color="green" size="lg" fullwidth>
            로그인
          </Button>
        </Container>
      </form>
    </div>
  );
}
