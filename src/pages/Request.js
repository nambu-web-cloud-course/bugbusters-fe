import Container from "../components/atom/Container";
import { Text, CountText } from "../components/atom/Text";
import Input from "../components/atom/Input";
import Button from "../components/atom/Button";
import { useForm } from "react-hook-form";
import { GapItems, Items } from "../components/atom/Items";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import axios from "axios";

export default function Request() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:8080/request", data);
      if (res.data.success) {
        alert("작성 성공");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(watch());

  return (
    <div>
      {/* 유저: 글 작성 컴포넌트 / 버스터: 글 목록 리스트 */}
      <form onSubmit={handleSubmit(onSubmit)}>
          <h1>잡아줘요</h1>
        <Container $size="sm">
          <input
            // style={{ display: "none" }}
            {...register("userid", { required: true })}
            defaultValue="t1"
            id="userid"
          />
          <label htmlFor="content">요청사항</label>
          <textarea {...register("content")} defaultValue="요청사항" />
          <label htmlFor="price">가격</label>
          <input {...register("price")} defaultValue="10000" />
          <label htmlFor="gender">성별</label>
          <fieldset>
            <input
              {...register("gender", { required: true })}
              type="radio"
              defaultChecked
              value="A"
            />
            <span>성별무관</span>
            <input
              {...register("gender", { required: true })}
              type="radio"
              name="gender"
              value="F"
            />
            <span>여자</span>
            <input
              {...register("gender", { required: true })}
              type="radio"
              name="gender"
              value="M"
            />
            <span>남자</span>
          </fieldset>
          <label htmlFor="addr1">주소</label>
          <input {...register("addr1")} defaultValue="주소" />
          <label htmlFor="addr2">상세주소</label>
          <input {...register("addr2")} defaultValue="상세주소" />
          <label htmlFor="zipcode">우편번호</label>
          <input {...register("zipcode")} defaultValue="12345" />
          <label htmlFor="sigungu">시군구</label>
          <input {...register("sigungu")} defaultValue="시군구" />

          <Button color="green" size="lg" fullwidth>
            글 작성
          </Button>
        </Container>
      </form>
    </div>
  );
}
