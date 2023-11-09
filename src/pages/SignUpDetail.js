import { Link, useParams  } from "react-router-dom";
import Button from "../components/atom/Button";
import Container from "../components/atom/Container";
import Input from "../components/atom/Input";
import Label from "../components/atom/Label";
import InputGroup from "../components/molecule/InputGroup";
import SignUpForm from "../components/organism/SignUpForm";

export default function SignUp(props) {
  const { usertype } = useParams();
  const title = usertype === "user" ? "무서버" : "버스터";
   // props 전달
  return (
    <div className="Content">
      <h1>{title} 회원가입</h1>
      <Container>
        <SignUpForm usertype={usertype}/>
      </Container>
    </div>
  );
}
