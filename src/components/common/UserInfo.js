import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import Badge from "../common/Badge";
import { GapItems } from "../common/Items";
import { P, Span } from "../common/Text";

export default function UserInfo() {
  return (
    <GapItems>
      <img
        src="https://picsum.photos/200"
        alt=""
        style={{ width: "3rem", borderRadius: "4px" }}
      />
      {/* 퇴치건수가 1개 이상일 경우 */}
      <div>
        <P $fontWeight="700">김철수 (32세/남성)</P>
        <GapItems>
          <Badge $bgColor="none" $padding="0.5rem 0">
            <BugReportRoundedIcon fontSize="small" />
            <span>퇴치건수 1</span>
          </Badge>
          <Span>서울특별시 양천구 목동</Span>
        </GapItems>
      </div>
      {/* 배지가 1개 이상일 경우 추가 */}
    </GapItems>
  );
}
