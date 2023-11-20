import { Link } from "react-router-dom";
import { P } from "../components/common/Text";

export default function NotFound() {
  return (
    <div className="Content">
      <h1>404 Not Found Error</h1>
      <P>이런, 페이지를 찾을 수 없어요.</P>
    </div>
  );
}
