import Badge from "../atom/Badge";
import Container from "../atom/Container";
import { SmallText } from "../atom/Text";

export default function List() {
  return (
    <div>
      <Container>
        <p>내용이 들어갑니다.</p>
        <Badge text="서울특별시 양천구 신정동"/>
        <Badge text="성별무관"/>
        <Badge text="10,000원"/>
        <SmallText>2023.12.31</SmallText>
      </Container>
    </div>
  );
}
