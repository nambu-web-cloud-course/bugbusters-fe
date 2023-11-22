import Badge from "../common/Badge";
import GapItems from "../common/GapItems";
import { P, Span } from "../common/Text";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

export default function UserInfo({
  busterid,
  userid,
  usertype,
  sido,
  sigungu,
  content,
  price,
  tradecount,
}) {
  return (
    <GapItems $gap="1rem" $left>
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
      </div>
      <div>
        <GapItems $col $left>
          <GapItems>
            <P $fontWeight="700">
              {usertype === "B" ? userid : busterid || "알 수 없음"}
            </P>
            <Span $textColor="gray04">
              {content ? content.slice(0, 20) + "..." : ""}
            </Span>
          </GapItems>
          <GapItems>
            {usertype === "B" ? (
              <Span $textColor="darkgreen" $fontWeight="700">
                {price ? `${price}원` : ""}
              </Span>
            ) : (
              <Badge
                $textColor="darkgreen"
                $fontWeight="500"
                $bgColor="transparent"
                $padding="0"
              >
                <BugReportRoundedIcon fontSize="small" />
                퇴치 건수 {tradecount ? tradecount : 0}
              </Badge>
            )}
            <Span $textColor="gray02">|</Span>
            <Span>
              {sido || ""} {sigungu || ""}
            </Span>
          </GapItems>
        </GapItems>
      </div>
    </GapItems>
  );
}
