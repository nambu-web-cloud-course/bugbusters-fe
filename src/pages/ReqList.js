import Container from "../components/common/Container";
import Badge from "../components/common/Badge";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { GapItems } from "../components/common/Items";
import { Span } from "../components/common/Text";
import Tabs from "../components/common/Tabs";

export default function ReqList() {
  return (
    <div>
      {/* 버스터만 볼 수 있는 페이지 */}
      {/* 필터 목록 */}
      <h1>잡아줘요</h1>
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
