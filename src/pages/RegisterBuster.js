import Container from "../components/atom/Container";
import Button from "../components/atom/Button";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function RegisterBuster() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/register-buster",
        data
      );
      console.log(res.data);
      if (res.data.success) {
        navigate("/sign-in");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Content">
      <h2> 프로필 작성 (2/2)</h2>
      <Container $size="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          
            <label htmlFor="profile">프로필</label>
            <input
              {...register("profile", { required: true })}
              defaultValue="imgurl"
              id="profile"
            />
          
          
            <label htmlFor="selfintro">자기소개</label>
            <input
              {...register("selfintro", { required: true })}
              defaultValue="안녕하세요. 버스터입니다."
              id="selfintro"
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
            회원가입
          </Button>
        </form>
      </Container>
    </div>
  );
}
