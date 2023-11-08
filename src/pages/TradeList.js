import Container from "../components/atom/Container";
import Text from "../components/atom/Text";
import Input from "../components/atom/Input";
import Label from "../components/atom/Label";
import Button from "../components/atom/Button";

export default function TradeList() {
  return (
    <div className="Content">
      <h1>이용내역</h1>
      <Container>{/* 리스트 매핑 */}</Container>
    </div>
  );
}
