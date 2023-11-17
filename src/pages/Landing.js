import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { GapItems } from "../components/common/GapItems";

export default function Landing() {
  return (
    <GapItems style={{ justifyContent: "center" }}>
      <img src="img/bug.jpg" width="30%" />
      <div>
        <h1>징그러운 벌레,</h1>
        <br />
        <h1 style={{ marginBottom: "3rem" }}>버스터에게 맡겨주세요!</h1>
        <Link to="/sign-up/user">
          <Button color="lightgreen" size="lg">
            무서버로 시작하기
          </Button>
        </Link>
        <Link to="/sign-up/buster">
          <Button color="green" size="lg">
            버스터로 시작하기
          </Button>
        </Link>
      </div>
    </GapItems>
  );
}
