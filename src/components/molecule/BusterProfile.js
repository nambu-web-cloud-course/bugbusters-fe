import Button from "../common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../common/Container";
import FileUpload from "../common/FileUpload";

export default function BusterProfile() {
  // current URL
  const url = new URL(window.location.href);
  const userid = url.searchParams.get("userid");
  console.log(`userid: ${userid}`);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue, 
    formState: { errors },
  } = useForm();

  console.log(watch());
  // 공통 회원가입 폼 제출 후 버스터 프로필 제출
  const handleBusterProfile = async (data) => {
    data.profile = watch("profile");
    console.log(data);

    try {
      // auth/buster에 버스터 프로필 POST 요청
      const res = await axios.post("http://localhost:8080/auth/buster", data);
      console.log("response:", res.data);
      if (res.data.success) {
        navigate("/sign-in");
      }
    } catch (err) {
      console.log("Buster Profile Submit Error", err);
    }
  };

  return (
    <div>
      <h1>버스터 회원가입</h1>
      <form onSubmit={handleSubmit(handleBusterProfile)}>
        <Container $size="sm">
          <input
            // style={{ display: "none" }}
            {...register("userid", { required: true })}
            defaultValue={userid}
            id="userid"
          />
          <label htmlFor="profile">프로필</label>
          <ImageUpload 
           id="profile"
           defaultValue="imgurl"
           setValue={setValue}
          />
          <label htmlFor="selfintro">자기소개</label>
          <input
            {...register("selfintro", { required: true })}
            defaultValue="안녕하세요. 버스터입니다."
            id="selfintro"
            autoFocus
          />
          <label htmlFor="tech">기술</label>
          <input
            {...register("tech", { required: true })}
            defaultValue="손으로 잡습니다."
            id="tech"
          />
          <label htmlFor="exp">벌레 잡은 경험</label>
          <input
            {...register("exp", { required: true })}
            defaultValue="집에서 바퀴벌레 잡아봤어요."
            id="exp"
          />
          <label htmlFor="fav">가장 잘 잡는 벌레</label>
          <input
            {...register("fav", { required: true })}
            defaultValue="바퀴벌레"
            id="fav"
          />
          <label htmlFor="accbank">은행</label>
          <input
            {...register("accbank", { required: true })}
            defaultValue="신한은행"
            id="accbank"
          />
          <label htmlFor="accno">계좌번호</label>
          <input
            {...register("accno", { required: true })}
            defaultValue="123345678"
            id="accno"
          />
          <Button color="green" size="lg" fullwidth>
            프로필 입력(2 / 2)
          </Button>
        </Container>
      </form>
    </div>
  );
}
