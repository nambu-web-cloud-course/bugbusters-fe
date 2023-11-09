import Container from "../components/atom/Container";
import { Text, CountText } from "../components/atom/Text";
import Input from "../components/atom/Input";
import Button from "../components/atom/Button";

import { useForm } from "react-hook-form";
import { GapItems, Items } from "../components/atom/Items";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

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
      {/* 유저: 글 작성 컴포넌트 / 버스터: 글 목록 리스트 */}
      <div className="Content">
        <h1>잡아줘요</h1>
        <Container>
          <label htmlFor="req">요청사항</label>
          <Text
            id="req"
            placeholder={"벌레 종류, 출몰 위치 등을 작성해주세요."}
          />

          <label htmlFor="amount">금액</label>
          <GapItems>
            <Input id="amount" placeholder={"10,000"} />
            <p>원</p>
          </GapItems>

          <label>성별</label>
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

          <label>주소</label>
          <GapItems>
            {/* 사용자 주소 가져오기 */}
            <Input placeholder={"도로명 주소 입력"} fullwidth />
            <Button color="green" size="lg" width={"4rem"}>
              수정
            </Button>
          </GapItems>
          <Input placeholder={"상세 주소"} fullwidth />

          <label>이미지</label>
          {/* 이미지 설정 */}

          <Button color="green" size="lg" fullwidth>
            글 작성
          </Button>
        </Container>
      </div>
    </form>
  );
}
