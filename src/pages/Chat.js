import Container from "../components/atom/Container";
import UserInfo from "../components/molecule/UserInfo";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { P, Span } from "../components/atom/Text";

export default function SignUp() {
  return (
    <div>
      <h1>채팅</h1>
      {/* 데이터 가져와서 채팅 콘텐츠 매핑, Link 클릭시 /chat?userid="buster" */}
      <Container>
        <UserInfo/>
        <P>안녕하세요. 김철수입니다.</P>
        <Span>2023-12-01 오후 07:30</Span>
      </Container>
    </div>
  );
}
