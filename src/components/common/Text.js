import styled, { css } from "styled-components";

const PStyles = css`
  font-size: ${({ theme, fontSize }) => theme.size.font[fontSize] || "1rem"};
  font-weight: ${(props) => props.$fontWeight || 400};
  color: ${({ theme, textColor }) => theme.color[textColor]};
  text-align: ${(props) => props.$textAlign || "left"};
`;

const SpanStyles = css`
  font-size: ${({ theme, fontSize }) =>
    theme.size.font[fontSize] || "0.875rem"};
     font-weight: ${(props) => props.$fontWeight || 400};
  color: ${({ theme, textColor }) =>
    theme.color[textColor] || theme.color.gray03};
  text-align: ${(props) => props.$textAlign || "left"};
`;

const P = styled.p`
  ${PStyles}
`;

const Span = styled.span`
  ${SpanStyles}
`;

export { Span, P };

