import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Container from "../components/common/Container";


// 가입은 무서버, 버스터로 구분
export default function SignUp() {
  return (
<div className="Content">
      <h1>회원가입</h1>
      <Container $size="sm">
        <Link to="/sign-up/user">
          <Button color="lightgreen" size="lg" $fullwidth>
            무서버로 시작하기
          </Button>
        </Link>
        <Link to="/sign-up/buster">
          <Button color="green" size="lg" $fullwidth>
            버스터로 시작하기
          </Button>
        </Link>
      </Container>
    </div>
  );
}
