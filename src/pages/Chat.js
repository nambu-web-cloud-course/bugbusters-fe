import Container from "../components/common/Container";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { P, Span } from "../components/common/Text";
import UserInfo from '../components/common/UserInfo'
import { GapItems } from "../components/common/Items";

export default function SignUp() {
  return (
    <div className="Content"> 
      <h1>채팅</h1>
      <Container>
        <UserInfo/>
        <P>안녕하세요. 김철수입니다.</P>
        <Span>2023-12-01 오후 07:30</Span>
      </Container>
    </div>
  );
}

