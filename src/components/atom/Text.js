import styled, { css } from "styled-components";

// const someStyle = css`
//   ${theme => {
//     const buttonColor = theme.color[color];
//     return css `
//     `
//   }}
// `

const PStyles = css`
  font-size: ${({ theme, fontSize }) => theme.size.font[fontSize] || "1rem"};
  font-weight: ${(fontWeight) => fontWeight || 400};
  color: ${({ theme, textColor }) => theme.color[textColor]};
  text-align: ${(textAlign) => textAlign || "center"};
`;

const SpanStyles = css`
  font-size: ${({ theme, fontSize }) =>
    theme.size.font[fontSize] || "0.875rem"};
  color: ${({ theme, textColor }) =>
    theme.color[textColor] || theme.color.gray03};
  text-align: ${(textAlign) => textAlign || "center"};
`;

const P = styled.p`
  ${PStyles}
`;

const Span = styled.span`
  ${SpanStyles}
`;

export { Span, P };
