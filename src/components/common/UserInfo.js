import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import Badge from "../common/Badge";
import GapItems from "../common/GapItems";
import { P, Span } from "../common/Text";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";

export default function UserInfo({
  busterid,
  userid,
  usertype,
  sido,
  sigungu,
  content,
  price,
  room,
}) {
  return (
    <GapItems gap="1rem" left="left">
      <div
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "0.25rem",
          backgroundColor: "lightgray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SentimentVeryDissatisfiedRoundedIcon
          fontSize="large"
          color="disabled"
        />
        {/* <img
          alt="Profile"
          style={{ width: "3rem", borderRadius: "0.25rem" }}
        /> */}
      </div>
      {/* 퇴치건수가 1개 이상일 경우 */}
      <div>
        <GapItems>
          <P $fontWeight="700">{usertype === "B" ? userid : busterid}</P>
          <Span textColor="gray04">{content} </Span>
        </GapItems>
        <GapItems>
          <Span textColor="darkgreen" $fontWeight="700">
            {price}원
          </Span>
          <Span>
            {sido} {sigungu}
          </Span>
        </GapItems>
        {usertype === "C" && (
          <div>
            <GapItems>
              <Badge $bgColor="none" $padding="0.5rem 0">
                <BugReportRoundedIcon fontSize="small" />
                <span>퇴치건수 1</span>
              </Badge>
            </GapItems>
            <GapItems>
              <Badge>꼼꼼해요 1</Badge>
              <Badge>빨라요 1</Badge>
            </GapItems>
          </div>
        )}
      </div>
      {/* 배지가 1개 이상일 경우 추가 */}
    </GapItems>
  );
}
