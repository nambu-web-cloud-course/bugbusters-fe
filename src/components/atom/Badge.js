import styled from "styled-components";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

const StyledBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: ${({ theme }) => theme.size.font};
  font-weight: 500;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.color.lightgreen};
  color: ${({ theme }) => theme.color.darkgreen};
`;

export default function Badge({text}) {
  return (
    <StyledBadge>
      {text}
      <BugReportRoundedIcon fontSize="small"/>
    </StyledBadge>
  );
}
