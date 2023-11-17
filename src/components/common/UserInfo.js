import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import Badge from "../common/Badge";
import { GapItems } from "./GapItems";
import { P, Span } from "../common/Text";

export default function UserInfo({ busterid, userid, usertype, room }) {
  return (
    <GapItems>
      <div
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "0.25rem",
          backgroundColor: "gray",
        }}
      >
        {/* <img
          src="https://picsum.photos/200"
          alt="Profile"
          style={{ width: "3rem", borderRadius: "0.25rem" }}
        /> */}
      </div>
      {/* 퇴치건수가 1개 이상일 경우 */}
      <div>
        <P $fontWeight="700">{usertype === "B" ? userid : busterid}</P>
        <GapItems>
          {/* <Badge $bgColor="none" $padding="0.5rem 0">
            <BugReportRoundedIcon fontSize="small" />
            <span>퇴치건수 1</span>
          </Badge> */}
          <Span>서울시 양천구 OO동</Span>
        </GapItems>
      </div>
      {/* 배지가 1개 이상일 경우 추가 */}
    </GapItems>
  );
}
