import Container from "../components/common/Container";
import Button from "../components/common/Button";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MyPage() {
  const userid = JSON.parse(localStorage.getItem("userid"));
  const [data, setData] = useState([]);
  console.log(data);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 회원가입시 기입한 유저 정보 가져오기
  const getData = async () => {
    try {
      const res = await axios.get(
        `/auth?userid=${userid}`
      );
      const data = res.data.data;
      setData(data);
    } catch (err) {
      console.log("MyPage Edit Error", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // 수정 데이터 서버에 전송
  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`/auth/${userid}`, data);
      if (res.data.success) alert("수정 성공")
    } catch (err) {
      console.log("MyPage Edit", err);
    }
  };

  return (
    <div className="Content">
      <h1>마이페이지</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container $size="sm">
          <label htmlFor="userid">아이디 </label>
          <input id="userid" value={data.userid} disabled />
          <label htmlFor="password">비밀번호</label>
          <input id="password" value={data.password} disabled />
          <label htmlFor="name">이름</label>
          <input id="name" value={data.name} disabled />
          <label htmlFor="birthdate">생년월일</label>
          <input id="birthdate" value={data.birthdate} disabled />
          <label htmlFor="phone">휴대폰번호</label>
          <input {...register("phone")} id="phone" defaultValue={data.phone} />
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
          <label htmlFor="addr1">주소</label>
          <input {...register("addr1")} defaultValue={data.addr1} />
          <label htmlFor="addr2">상세주소</label>
          <input {...register("addr2")} defaultValue={data.addr2} />
          <label htmlFor="zipcode">우편번호</label>
          <input {...register("zipcode")} defaultValue={data.zipcode} />
          <label htmlFor="sigungu">시군구</label>
          <input {...register("sigungu")} defaultValue={data.sigungu} />
          <Button color="green" size="lg" fullwidth>
            정보 수정
          </Button>
        </Container>
      </form>
      <Button color="green" size="lg" outline fullwidth>
        회원 탈퇴
      </Button>
    </div>
  );
}
