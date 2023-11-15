import Button from "../common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../common/Container";
import ImageUpload from "../common/ImageUpload";
import { useState, useEffect } from "react";

export default function BusterProfile() {
  // 프로필 작성 중인 버스터 아이디
  const url = new URL(window.location.href);
  const signUpID = url.searchParams.get("userid");

  // 회원가입한 버스터 아이디
  const busterID = JSON.parse(localStorage.getItem("userid"));
  const [data, setData] = useState([]);
  const [img, setImage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch())

  const handleBusterProfile = async (data) => {
    // 회원가입 - 버스터 프로필 등록
    if (!busterID) {
      try {
        const res = await axios.post("http://localhost:8080/auth/buster", data);
        console.log("Buster Signup:", res.data);
        if (res.data.success) {
          navigate("/sign-in");
        }
      } catch (err) {
        console.log("Buster Profile Submit Error", err);
      }
    }
    // 버스터 프로필 수정
    else {
      try {
        const res = await axios.put(
          `http://localhost:8080/auth/buster/${busterID}`, data
        );
        if (res.data.success) alert("프로필 수정 완료");
      } catch (err) {
        console.log("Buster Profile Edit Error", err);
      }
    }
  };

  // 가입한 버스터의 프로필 정보 가져오기
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/auth/buster?userid=${busterID}`
      );
      const data = res.data.data;
      setData(data);
      setImage(data.profile);
    } catch (err) {
      console.log("Buster Profile Fetching Error", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Content">
      <h1>{busterID ? "프로필" : "버스터 프로필 작성"}</h1>
      <form onSubmit={handleSubmit(handleBusterProfile)}>
        <Container $size="sm">
          <input
            style={{ display: "none" }}
            {...(busterID ? {} : register("userid", { required: true }))}
            defaultValue={signUpID}
            id="userid"
          />
          <label htmlFor="profile">프로필</label>
          <ImageUpload id="profile" setValue={setValue} />
          <img
            style={{ width: "100px" }}
            src={`http://localhost:8080/${img}`}
          />
          <label htmlFor="selfintro">자기소개</label>
          <input
            {...register("selfintro", { required: true })}
            defaultValue={data ? data.selfintro : ""}
            id="selfintro"
            autoFocus
          />
          <label htmlFor="tech">기술</label>
          <input
            {...register("tech", { required: true })}
            defaultValue={data ? data.tech : ""}
            id="tech"
          />
          <label htmlFor="exp">벌레 잡은 경험</label>
          <input
            {...register("exp", { required: true })}
            defaultValue={data ? data.exp : ""}
            id="exp"
          />
          <label htmlFor="fav">가장 잘 잡는 벌레</label>
          <input
            {...register("fav", { required: true })}
            defaultValue={data ? data.fav : ""}
            id="fav"
          />
          <label htmlFor="accbank">은행</label>
          <input
            {...register("accbank", { required: true })}
            defaultValue={data ? data.accbank : ""}
            id="accbank"
          />
          <label htmlFor="accno">계좌번호</label>
          <input
            {...register("accno", { required: true })}
            defaultValue={data ? data.accno : ""}
            id="accno"
          />
          <Button color="green" size="lg" fullwidth>
            {busterID ? "프로필 수정" : "프로필 입력(2 / 2)"}
          </Button>
        </Container>
      </form>
    </div>
  );
}
