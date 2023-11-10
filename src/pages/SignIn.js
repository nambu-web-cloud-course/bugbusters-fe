import Button from "../components/atom/Button";
import Container from "../components/atom/Container";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // header에 bearer, authorization 추가
    try {
      const res = await axios.post("http://localhost:8080/auth/sign-in", data);

      if (res.data.success) {
        navigate("/request");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container $size="sm">
          <label htmlFor="userid">아이디</label>
          <input
            {...register("userid", { required: true })}
            placeholder={"아이디를 입력하세요."}
            id="userid"
            fullwidth
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
