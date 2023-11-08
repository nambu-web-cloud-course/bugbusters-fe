import styled, { css } from "styled-components";

const fullWidthStyle = css`
  ${(props) =>
    props.fullwidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;

const StyledInput = styled.input`
  width: 13rem;
  padding: 1rem;
  height: 3rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.01563rem;
  border: none;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.color.gray01};

  ${fullWidthStyle}
`;

export default function Input({ fullwidth, ...rest }) {
  return <StyledInput fullwidth={fullwidth} {...rest}></StyledInput>;
}
