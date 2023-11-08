import styled from "styled-components";

const Badge = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.color.lightgreen};
  color: ${({ theme }) => theme.color.darkgreen};
`;

export default Badge;
