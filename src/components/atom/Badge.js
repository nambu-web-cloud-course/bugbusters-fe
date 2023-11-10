import styled from "styled-components";

const Badge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  gap: 0.25rem;
  font-size: ${({ theme }) => theme.size.font};
  font-weight: 500;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.color.lightgreen};
  color: ${({ theme }) => theme.color.darkgreen};
`;

export default Badge
 