import styled from "styled-components";

const Text = styled.textarea`
  padding: 1rem;
  width: 100%;
  height: 12rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01563rem;
  border-radius: 0.5rem;
  border: none;
  background: ${({ theme }) => theme.color.gray01};
`;

export default Text;
