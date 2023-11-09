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
  margin-bottom: 0.5rem;
`;

const SmallText = styled.p`
  font-size: ${({ theme }) => theme.size.font.sm};
  color: ${({ theme }) => theme.color.gray03};
  text-align: right;
`;

export { Text, SmallText };
