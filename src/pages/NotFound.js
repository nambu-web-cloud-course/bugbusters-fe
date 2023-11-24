import { Link, useNavigate } from "react-router-dom";
import { P } from "../components/common/Text";
import Button from "../components/common/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="Wrapper">
      <div className="Content">
        <h1>404 Error</h1>
        <P>이런, 페이지를 찾을 수 없어요.</P>
        <Button
          color="green"
          size="lg"
          onClick={() => {
            navigate("/");
          }}
        >
          메인으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
