import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../atom/Button";
import Container from "../atom/Container";

export default function CommonForm({ handleCommonForm }) {
  // URL의 usertype 파라미터 가져오기
  const { usertype } = useParams();
  console.log(`usertype: ${usertype}`);
  // URL 파라미터에 따라 무서버/버스터 결정
  const isBuster = usertype === "buster" ? true : false;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleCommonForm)}>
      <Container $size="sm">
        <label htmlFor="userid">아이디</label>
        <input
          {...register("userid", { required: true })}
          defaultValue="a"
          id="userid"
          autoFocus
        />
        <label htmlFor="password">비밀번호</label>
        <input
          {...register("password", { required: true })}
          defaultValue="a"
          id="password"
        />
        <label htmlFor="name">이름</label>
        <input
          {...register("name", { required: true })}
          defaultValue="홍길동"
          id="name"
        />
        <label htmlFor="birthdate">생년월일</label>
        <input
          {...register("birthdate", { required: true })}
          defaultValue="19901231"
          id="birthdate"
        />
        <label htmlFor="phone">휴대폰번호</label>
        <input
          {...register("phone", { required: true })}
          defaultValue="010-1234-5678"
          id="phone"
        />
        <label htmlFor="gender">성별</label>
        <div className="select">
          <input
            {...register("gender")}
            value="F"
            type="radio"
            id="F"
            defaultChecked
          />
          <label htmlFor="F">여자</label>
          <input {...register("gender")} value="M" type="radio" id="M" />
          <label htmlFor="M">남자</label>
        </div>
        <label htmlFor="addr1">주소</label>
        <input
          {...register("addr1", { required: true })}
          defaultValue="선릉로120"
        />
        <label htmlFor="addr2">상세주소</label>
        <input
          {...register("addr2", { required: true })}
          defaultValue="11-1234"
        />
        <label htmlFor="zipcode">우편번호</label>
        <input
          {...register("zipcode", { required: true })}
          defaultValue="12345"
        />
        <label htmlFor="sido">서울시</label>
        <input {...register("sido")} defaultValue="서울시" />
        {/* 삭제 */}
        <label htmlFor="sigungu">시군구</label>
        <input {...register("sigungu")} defaultValue="서울시" />
        <label htmlFor="usertype">유저타입</label>
        <input {...register("usertype")} defaultValue="C" />
        <Button color="green" size="lg" fullwidth>
          {isBuster ? "개인정보 입력(1 / 2)" : "회원가입"}
        </Button>
      </Container>
    </form>
  );
}
