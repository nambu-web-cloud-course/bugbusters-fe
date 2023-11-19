import { Link, useParams } from "react-router-dom";
import Container from "../components/common/Container";
import GapItems from "../components/common/GapItems";
import Button from "../components/common/Button";
import api from "../api";
import UserInfo from "../components/common/UserInfo";
import { P, Span } from "../components/common/Text";
import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";

export default function Review() {
  const { tradeid } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch());
  const writeReview = async (data) => {
    const review = {
      rev1: "",
      rev2: "",
      rev3: ""
    }
    try {
      const res = await api.put(`/trade/${tradeid}`, review);
      if (res.data.success)
        console.log("Success writing review", res.data.data);
      else console.log("Error writing review");
    } catch (err) {
      console.log("Error writing review");
    }
  };

  return (
    <div className="Content">
      {/* 제출 후 완료 컴포넌트 보여주기 */}
      <h1>리뷰</h1>
      <form onSubmit={handleSubmit(writeReview)}>
        <Container>
          <UserInfo />
          <P>
            거래는 만족스러우셨나요?
            <br />
            버스터를 설명할 수 있는 키워드를 선택해주세요.{" "}
          </P>
          <GapItems>
            <input
              type="checkbox"
              id="1"
              {...register("1")}
              defaultChecked
            />
            <label htmlFor="1">빨라요</label>
            <input type="checkbox" id="2" {...register("2")} />
            <label htmlFor="2">침착해요</label>
            <input type="checkbox" id="3" {...register("3")} />
            <label htmlFor="3">시간을 잘 지켜요</label>
            <input type="checkbox" id="4" {...register("4")} />
            <label htmlFor="4">꼼꼼해요</label>
            <input type="checkbox" id="5" {...register("5")} />
            <label htmlFor="5">섬세해요</label>
          </GapItems>
          <Button color="green" size="lg" fullwidth>
            제출
          </Button>
        </Container>
      </form>
    </div>
  );
}
