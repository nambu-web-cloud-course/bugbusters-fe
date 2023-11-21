import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import GapItems from "../components/common/GapItems";
import { Span, P } from "../components/common/Text";

export default function Landing() {
  return (
    <div className="content">
      <div>
        <h1>징그러운 벌레,</h1>
        <h1>버스터가 잡아드려요!</h1>

        <GapItems>
          <img src="img/buster.png" alt="버스터.png" width="400px" />
          <GapItems $col>
            <Link to="/sign-up/user">
              <Button $color="lightgreen" $size="lg">
                <P $textAlign="center" $fontWeight="600">
                  무서버로 시작하기
                </P>
              </Button>
            </Link>
            <Link to="/sign-up/buster">
              <Button $color="green" $size="lg">
                <GapItems $col>
                  <P $textAlign="center" $fontWeight="600">
                    버스터로 시작하기
                  </P>
                </GapItems>
              </Button>
            </Link>
          </GapItems>
        </GapItems>
      </div>
    </div>
  );
}
