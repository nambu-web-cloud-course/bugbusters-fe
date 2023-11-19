import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import GapItems from "../components/common/GapItems";
import { Span, P } from "../components/common/Text";

export default function Landing() {
  return (
    <div className="content">
      <div>
        <h1>징그러운 벌레,</h1>
        <br />
        <h1 style={{ marginBottom: "3rem" }}>버스터에게 맡겨주세요!</h1>
        <img src="img/buster.png" alt="버스터.png" width="400px" />
        <GapItems col="col">
          <Link to="/sign-up/user" style={{ width: "100%" }}>
            <Button color="lightgreen" size="lg" fullwidth>
              <P $textAlign="center" $fontWeight="600">
                무서버로 시작하기
              </P>
            </Button>
          </Link>
          <Link to="/sign-up/buster" style={{ width: "100%" }}>
            <Button color="green" size="lg" fullwidth>
              <GapItems col="col">
                <P $textAlign="center" $fontWeight="600">
                  버스터로 시작하기
                </P>
              </GapItems>
            </Button>
          </Link>
        </GapItems>
      </div>
    </div>
  );
}
