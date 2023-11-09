import { Link } from "react-router-dom";
import Button from "../components/atom/Button";
import Container from "../components/atom/Container";
import Input from "../components/atom/Input";
import Label from "../components/atom/Label";
import InputGroup from "../components/molecule/InputGroup";

export default function SignUp() {
  return (
    <div className="Content">
      <h1>회원가입</h1>
      <Container>
        <Link to="/sign-up/user">
          <Button color="lightgreen" size="lg" fullwidth>
            무서버로 시작하기
          </Button>
        </Link>
        <Link to="/sign-up/buster">
          <Button color="green" size="lg" fullwidth>
            버스터로 시작하기
          </Button>
        </Link>
      </Container>
    </div>
  );
}
