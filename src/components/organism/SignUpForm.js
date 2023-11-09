import { useForm } from "react-hook-form";
import InputGroup from "../molecule/InputGroup";
import axios from "axios";
import Label from "../atom/Label";
import Input from "../atom/Input";
import Button from "../atom/Button";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function SignUpForm(props) {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  // 데이터 서버에 전송
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:8080/auth/sign-up", data);
      // 유저 타입에 따라서 이동 페이지 분기
      if (res.data.success) {
        if (props.usertype === "user") {
          navigate("/sign-in");
        } 
        // else {
        //   navigate("/register-buster");
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <label>아이디</label>
        <input {...register("userid")} value="test1234" />
      </InputGroup>
      <InputGroup>
        <label>비밀번호</label>
        <input {...register("password")} value="Pass1234!" />
      </InputGroup>
      <InputGroup>
        <label>이름</label>
        <input {...register("name")} value="홍길동" />
      </InputGroup>
      <InputGroup>
        <label>생년월일</label>
        <input {...register("birthdate")} value="19901231" />
      </InputGroup>
      <InputGroup>
        <label>주소</label>
        <input {...register("addr1")} value="선릉로120" />
      </InputGroup>
      <InputGroup>
        <label>상세주소</label>
        <input {...register("addr2")} value="11-1234" />
      </InputGroup>
      <InputGroup>
        <label>우편번호</label>
        <input {...register("zipcode")} value="12345" />
      </InputGroup>
      <InputGroup>
        <label>시군구</label>
        <input {...register("sigungu")} value="양천구" />
      </InputGroup>
      <InputGroup>
        <label>서울시</label>
        <input {...register("sido")} value="서울시" />
      </InputGroup>
      <select {...register("gender")}>
        <label>성별</label>
        <option value="F">여자</option>
        <option value="M">남자</option>
      </select>
      <InputGroup>
        <label>휴대폰번호</label>
        <input {...register("phone")} value="010-1234-5678" />
      </InputGroup>
      <InputGroup>
        <label>유저타입</label>
        <input {...register("usertype")} value="C" />
      </InputGroup>

      <label>
        {props.usertype === "user" ? "회원가입" : "다음"}
        <input type="submit" />
      </label>

      {/* 유저면 버튼 문구가 "전송" -> 회원가입(서버로 데이터 전송) */}
      {/* 버스터면 버튼 문구가 "다음" ->  */}
    </form>
  );
}

// <InputGroup>
//   <Label htmlFor="id">아이디</Label>

//   <input
//     {...register("id", { required: true, minLength: 4, maxLength: 15 })}
//     name="id"
//     id="id"
//     type="text"
//     placeholder={"4~15자리 영소문자, 숫자"}

//     ref={register}
//   />
// </InputGroup>
// <InputGroup>
//   <Label htmlFor="pw">비밀번호</Label>
//   <Input
//     {...register("password", {
//       required: true,
//       minLength: 4,
//       maxLength: 15,
//       pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,20}$/,
//     })}
//     type="password"
//     id="pw"
//     placeholder={"8~20자리 영문 대/소문자, 숫자, 특수문자 조합"}
//     fullwidth
//   />
// </InputGroup>
// <InputGroup>
//   <Label htmlFor="name">이름</Label>
//   <Input
//     {...register("name")}
//     id="name"
//     placeholder={"이름 입력"}
//     fullwidth
//   />
// </InputGroup>
// <InputGroup>
//   <Label htmlFor="birthdate">생년월일</Label>
//   <Input
//     {...register("birthdate", { required: true, maxLength: 20 })}
//     id="birthdate"
//     placeholder={"19901231"}
//     fullwidth
//   />
// </InputGroup>
// <Label htmlFor="gender">성별</Label>
// <select {...register("gender", { required: true })}>
//   <option value="여자">female</option>
//   <option value="남자">male</option>
// </select>
// <InputGroup>
//   <Label htmlFor="phone">휴대폰번호</Label>
//   <Input
//     {...register("phone", { required: true, maxLength: 13 })}
//     id="phone"
//     type="tel"
//     placeholder={"01012345678"}
//     fullwidth
//   />
// </InputGroup>
// <Button type="submit" color="green" size="lg" fullwidth>
//   회원 가입
// </Button>
