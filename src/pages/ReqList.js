import Container from "../components/atom/Container";
import Badge from "../components/atom/Badge";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { GapItems } from "../components/atom/Items";
import { Span } from "../components/atom/Text";
import Tabs from "../components/atom/Tabs";
// 아이콘 가져오기

export default function ReqList() {
  return (
    <div>
      <h1>이용내역</h1>
      <Tabs />
      {/* 데이터 가져와서 매핑 -> 유저는 글 쓴 내용, 버스터는 상세페이지 link: ('/list/:postid') */}
      <Container>
        <p>내용이 들어갑니다.</p>
        <GapItems>
          <Badge>
            <LocationOnRoundedIcon fontSize="small" />
            지역
          </Badge>
          <Badge>
            <PersonRoundedIcon fontSize="small" />
            성별
          </Badge>
          <Badge>
            <CreditCardRoundedIcon fontSize="small" />
            가격
          </Badge>
        </GapItems>
        <Span>2023.12.31</Span>
      </Container>
    </div>
  );
}
