import styled from "styled-components";

const Input = styled.input`
  width: ${props => (props.$width === "full" ? "100%" : "13rem")};
  padding: 1rem;
  height: 3rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01563rem;
  border: none;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.color.gray01};
`;

export default Input;
