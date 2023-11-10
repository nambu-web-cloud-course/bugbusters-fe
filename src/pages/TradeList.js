import Container from "../components/atom/Container";
import Badge from "../components/atom/Badge";
import { SmallText, Text } from "../components/atom/Text"
import Tabs from "../components/molecule/Tabs";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
// 아이콘 가져오기

export default function TradeList() {
  return (
    <div>
      <h1>이용내역</h1>
        <Tabs/>
      {/* 데이터 가져와서 매핑 */}
      <Container>
        <p>내용이 들어갑니다.</p>
        <Badge>
          <LocationOnRoundedIcon />
          지역
        </Badge>
        <Badge>
          <LocationOnRoundedIcon />
          성별
        </Badge>
        <Badge>
          <LocationOnRoundedIcon />
          가격
        </Badge>
        <SmallText>2023.12.31</SmallText>
      </Container>
    </div>
  );
}
