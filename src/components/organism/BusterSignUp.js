import Button from "../components/atom/Button";
import Container from "../components/atom/Container";
import Input from "../components/atom/Input";
import Label from "../components/atom/Label";
import InputGroup from "../components/molecule/InputGroup";

export default function BusterSignUp() {
  return (
    <div className="Content">
      <h1>버스터 회원가입</h1>
      <Container $size="sm">
        <InputGroup>
          <Label>아이디</Label>
          <Input placeholder={"아이디를 입력하세요."} fullwidth />
        </InputGroup>
        <InputGroup>
          <Label>비밀번호</Label>
          <Input type="password" placeholder={"아이디를 입력하세요."} fullwidth />
        </InputGroup>
        <Button color="green" size="lg" fullwidth>
          로그인
        </Button>
      </Container>
    </div>
  );
}
