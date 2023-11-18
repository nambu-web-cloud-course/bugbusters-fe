import { Link, useParams } from "react-router-dom";
import Container from "../components/common/Container";
import GapItems from "../components/common/GapItems";
import Button from "../components/common/Button";
import api from "../api";
import UserInfo from "../components/common/UserInfo";

export default function Review() {
  const { tradeid } = useParams();

  const writeReview = async () => {
    const review = {
      rev1: 1,
      rev2: 2,
      rev3: 3,
    };
    try {
      const res = await api.put(`/trade/${tradeid}`, review);
      if (res.data.success)
        console.log("Success on writing review", res.data.data);
    } catch (err) {
      console.log("Error on writing review");
    }
  };

  return (
    <div className="Content">
      {/* 제출 후 완료 컴포넌트 보여주기 */}
        <h1>리뷰</h1>
      <form action="">
        <Container>
          <UserInfo />
          <hr />
          리뷰를 작성하세요.
          <GapItems>
            <Button color="green" size="sm">
              빨라요
            </Button>
            <Button color="green" size="sm">
              침착해요
            </Button>
            <Button color="green" size="sm">
              터프해요
            </Button>
          </GapItems>
          <Button color="green" size="lg" fullwidth>
            제출
          </Button>
        </Container>
      </form>
    </div>
  );
}
