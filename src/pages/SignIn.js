import { useState } from "react";
import Button from "../components/atom/Button";
import Container from "../components/atom/Container";
import Input from "../components/atom/Input";
import Label from "../components/atom/Label";
import InputGroup from "../components/molecule/InputGroup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    userid: "",
    password: "",
  });

  const handleChange = async (e) => {
    e.preventDefault();
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
    console.log(account);
  };

  const handleSubmit = async () => {
    // header에 bearer
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/sign-in",
        account
      );
      console.log(res.data);
      if (res.data.success) {
        // 이부분 완성시키기
        navigate("/sign-in-success");
      }
      // alert("로그인 성공", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Content">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <Container $size="sm">
          <InputGroup>
            <Label>아이디</Label>
            <Input
              placeholder={"아이디를 입력하세요."}
              fullwidth
              onChange={handleChange}
              name="userid"
            />
          </InputGroup>
          <InputGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder={"아이디를 입력하세요."}
              fullwidth
              onChange={handleChange}
              name="password"
            />
          </InputGroup>
          <Button color="green" size="lg" fullwidth>
            로그인
          </Button>
        </Container>
      </form>
    </div>
  );
}
