import Container from "../components/atom/Container";
import Badge from "../components/atom/Badge";
import { SmallText, Text } from "../components/atom/Text";
import Tabs from "../components/molecule/Tabs";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import { GapItems } from "../components/atom/Items";
// 아이콘 가져오기

export default function TradeList() {
  return (
    <div>
      <h1>이용내역</h1>
      <Tabs />
      {/* 데이터 가져와서 매핑 */}
      <Container>
        <p>내용이 들어갑니다.</p>
        <GapItems>
          <Badge>
            <LocationOnRoundedIcon />
            지역
          </Badge>
          <Badge>
            <PersonRoundedIcon />
            성별
          </Badge>
          <Badge>
          <CreditCardRoundedIcon/>
            가격
          </Badge>
        </GapItems>
        <SmallText>2023.12.31</SmallText>
      </Container>
    </div>
  );
}
