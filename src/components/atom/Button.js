import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

const colorStyles = css`
  ${({ theme, color }) => {
    const buttonColor = theme.color[color];
    return css`
      background: ${buttonColor};
      &:hover {
        background: ${lighten(0.1, buttonColor)};
      }
      &:active {
        background: ${darken(0.1, buttonColor)};
      }
      ${(props) =>
        props.outline &&
        css`
          color: ${buttonColor};
          background: none;
          border: 1px solid ${buttonColor};
          &:hover {
            background: ${buttonColor};
            color: white;
          }
        `}
    `;
  }}
`;

const sizes = {
  lg: {
    padding: "1rem",
    fontSize: "1rem",
  },
  md: {
    padding: "0.625rem 0.5rem",
    fontSize: "0.9375rem",
  },
  sm: {
    padding: "0.375rem 0.5rem",
    fontSize: "0.875rem",
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    padding: ${sizes[size].padding};
    font-size: ${sizes[size].fontSize};
  `}
`;

const fullWidthStyle = css`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  color: white;
  cursor: pointer;

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  ${fullWidthStyle}
`;


export default function Button({
  children,
  color,
  size,
  outline,
  fullWidth,
  ...rest
}) {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
