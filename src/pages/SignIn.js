import Button from "../components/common/Button";
import Container from "../components/common/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api";

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/sign-in", data);
      if (res.data.success) {
        console.log("Sign in Success");
        const userid = res.data.userid;
        const token = res.data.token;

        // 유저 타입 가져오기
        const userInfo = await api.get(`/auth?userid=${userid}`);
        console.log("usreInfo", userInfo);
        const usertype = userInfo.data.data.usertype;

        // 로컬 스토리지에 아이디, 토큰, 유저타입 저장 -> 나중에 객체로 합치기
        localStorage.setItem("userid", JSON.stringify(userid));
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("usertype", JSON.stringify(usertype));
        navigate("/request");
      } else {
        console.log("Error sign in");
      }
    } catch (err) {
      console.log("Error sign in", err);
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
            $fullwidth
            autoFocus
          />
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder={"비밀번호를 입력하세요."}
            id="password"
            $fullwidth
          />
          <Button color="green" size="lg" $fullwidth>
            로그인
          </Button>
        </Container>
      </form>
    </div>
  );
}
