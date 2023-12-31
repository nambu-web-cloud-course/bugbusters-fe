import styled from "styled-components";

const Badge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.$padding || "0.375rem 0.5rem"};
  gap: 0.25rem;
  font-size: ${({ theme, $fontSize }) => theme.size[$fontSize]};
  font-weight: 500;
  border-radius: 0.5rem;
  background-color: ${({ $bgColor, theme }) =>
    $bgColor || theme.color.lightgreen};
  color: ${({ theme }) => theme.color.darkgreen};
`;

export default Badge;
