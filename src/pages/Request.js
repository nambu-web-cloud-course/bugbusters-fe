import Container from "../components/atom/Container";
import { Text, CountText } from "../components/atom/Text";
import Input from "../components/atom/Input";
import Label from "../components/atom/Label";
import Button from "../components/atom/Button";
import InputGroup from "../components/molecule/InputGroup";
import { useForm } from "react-hook-form";
import { GapItems, Items } from "../components/atom/Items";

export default function Request() {
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(watch("example"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="Content">
        <h1>잡아줘요</h1>
        <Container>
          <InputGroup>
            <Label htmlFor="req">요청사항</Label>
            <Text
              id="req"
              placeholder={"벌레 종류, 출몰 위치 등을 작성해주세요."}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="amount">금액</Label>
            <GapItems>
              <Input id="amount" placeholder={"10,000"} />
              <p>원</p>
            </GapItems>
          </InputGroup>
          <InputGroup>
            <Label>성별</Label>
            <GapItems>
              <Button color="green" size="lg" outline fullwidth>
                성별 무관
              </Button>
              <Button color="green" size="lg" outline fullwidth>
                여자
              </Button>
              <Button color="green" size="lg" outline fullwidth>
                남자
              </Button>
            </GapItems>
          </InputGroup>
          <InputGroup>
            <Label>주소</Label>
            <GapItems>
              {/* 사용자 주소 가져오기 */}
              <Input placeholder={"도로명 주소 입력"} fullwidth />
              <Button color="green" size="lg" width={"4rem"}>
                수정
              </Button>
            </GapItems>
            <Input placeholder={"상세 주소"} fullwidth />
          </InputGroup>
          <InputGroup>
            <Label>이미지</Label>
            {/* 이미지 설정 */}
          </InputGroup>
          <Button color="green" size="lg" fullwidth>
            글 작성
          </Button>
        </Container>
      </div>
    </form>
  );
}
