import styled, { css } from "styled-components";
import { darken, lighten } from "polished";
import { useState } from "react";

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
        props.$outline &&
        css`
          color: ${buttonColor};
          background: white;
          border: 1px solid ${buttonColor};
          &:hover {
            background:${lighten(0.4, buttonColor)};
            color: ${buttonColor};
          }
        `}
      ${(props) =>
        props.color === "lightgreen" &&
        css`
          color: ${theme.color.darkgreen};
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
    props.$fullwidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;

const width = css`
  ${(props) =>
    css`
      width: ${props.width};
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
  ${width}

  /* 색상 */
  ${colorStyles}

  ${fullWidthStyle}
`;

// 이미지 버튼 추가

export default function Button({
  children,
  color,
  size,
  outline,
  fullwidth,
  width,
  ...rest
}) {
  return (
    <StyledButton
      color={color}
      size={size}
      $outline={outline}
      $fullwidth={fullwidth}
      width={width}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
