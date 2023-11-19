import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import GapItems from "../components/common/GapItems";
import { Span, P } from "../components/common/Text";

export default function SignUp() {
  return (
    <div className="Content">
      <h1>회원 가입</h1>
      <GapItems>
        <Container $size="sm">
          <P $textAlign="center">
            평화로운 집에 벌레가 나타났다구요?
            <br />
            지금 바로 버스터에게 요청하세요.
          </P>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img src="img/muserver.png" alt="무서버.png" width="80%" />
          </div>
          <Link to="/sign-up/user">
            <Button color="lightgreen" size="lg" $fullwidth>
              무서버로 시작하기
            </Button>
          </Link>
        </Container>
        <Container $size="sm">
          <P $textAlign="center">
            벌레따위 맨손으로도 잡는다면?
            <br />
            지금 바로 무서버님의 벌레를 잡아주세요!
          </P>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img src="img/buster.png" alt="버스터.png" width="80%" />
          </div>
          <Link to="/sign-up/buster">
            <Button color="green" size="lg" $fullwidth>
              버스터로 시작하기
            </Button>
          </Link>
        </Container>
      </GapItems>
    </div>
  );
}
