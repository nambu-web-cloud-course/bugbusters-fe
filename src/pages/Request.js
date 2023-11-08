import Container from "../components/atom/Container";
import Text from "../components/atom/Text";
import Input from "../components/atom/Input";
import Label from "../components/atom/Label";
import Button from "../components/atom/Button";
import InputGroup from "../components/molecule/InputGroup";

export default function Request() {
  return (
    <div className="Content">
      <h1>잡아줘요</h1>
      <Container>
        <form action="">
          <InputGroup>
            <Label for="req">요청사항</Label>
            <Text
              id="req"
              placeholder={"벌레 종류, 출몰 위치 등을 작성해주세요."}
            />
            {/* 글자 수 세기 */}
            <div>1 / 100</div>
          </InputGroup>
          <InputGroup>
            <Label for="amount">금액</Label>
            <Input id="amount" placeholder={"10,000원"} />
          </InputGroup>
          <InputGroup>
            <Label>성별</Label>
            <Button width="30%" color="green" size="lg">
              성별 무관
            </Button>
            <Button width="30%" color="green" size="lg" outline>
              여자
            </Button>
            <Button width="30%" color="green" size="lg" outline>
              남자
            </Button>
          </InputGroup>
          <InputGroup>
            <Label>주소</Label>
            <Input placeholder={"도로명 주소 입력"} />
            <Button color="green" size="lg">
              수정
            </Button>
            <Input placeholder={"상세 주소"} />
          </InputGroup>
          <InputGroup>
            <Label>이미지</Label>
            {/* 이미지 설정 */}
          </InputGroup>
          <Button color="green" size="lg" fullWidth>
            글 작성
          </Button>
        </form>
      </Container>
    </div>
  );
}
