import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import Badge from "../atom/Badge";
import { GapItems } from "../atom/Items";
import { P, Span } from "../atom/Text";

export default function UserInfo() {
  return (
    <div>
      <img
        src="https://picsum.photos/200"
        alt=""
        style={{ width: "3rem", borderRadius: "4px" }}
      />
      <P fontWeight="700">김철수 (32세/남성)</P>
      {/* 퇴치건수가 1 이상일 경우 */}
      <GapItems>
        <Badge $bgColor="none">
          <BugReportRoundedIcon fontSize="small" />
          <span>퇴치건수 1</span>
        </Badge>
        <Span>서울특별시 양천구 목동</Span>
      </GapItems>
    </div>
  );
}