import Button from "../components/common/Button";
import Container from "../components/common/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api";
import { Span, P } from "../components/common/Text";
import Modal from "../components/common/Modal";
import GapItems from "../components/common/GapItems";

export default function SignIn() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const handleModal = () => {
  //   setShowModal(!showModal);
  // };

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/sign-in", data);
      if (res.data.success) {
        console.log("Sign in Success");
        const userid = res.data.userid;
        const token = res.data.token;
        const usertype = res.data.usertype;

        // 로컬 스토리지에 아이디, 토큰, 유저타입 저장
        localStorage.setItem("userid", JSON.stringify(userid));
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("usertype", JSON.stringify(usertype));
        navigate("/");
      } else {
        setShowModal(!showModal);
        navigate("/sign-in");
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
          <GapItems $col $left>
            <label htmlFor="userid">아이디</label>
            <GapItems $col $left>
              <input
                {...register("userid", { required: true })}
                placeholder={"아이디를 입력하세요."}
                id="userid"
                $fullwidth
                autoFocus
              />
              {errors.userid?.type === "required" && (
                <Span $textColor="alert">아이디를 입력해주세요.</Span>
              )}
            </GapItems>
          </GapItems>
          <GapItems $col $left>
            <label htmlFor="password">비밀번호</label>
            <GapItems $col $left>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder={"비밀번호를 입력하세요."}
                id="password"
                $fullwidth
              />
              {errors.password?.type === "required" && (
                <Span $textColor="alert">비밀번호를 입력해주세요.</Span>
              )}
            </GapItems>
          </GapItems>
          {showModal && (
            <Modal showModal={showModal} setShowModal={setShowModal} $width="24rem">
              <GapItems $col $gap="3rem">
                <P>아이디 또는 비밀번호를 잘못 입력했습니다.</P>
                <Button $color="green" $size="lg" $width="50%">
                  확인
                </Button>
              </GapItems>
            </Modal>
          )}
          <Button $color="green" $size="lg" $fullwidth>
            로그인
          </Button>
        </Container>
      </form>
    </div>
  );
}
