import { css, styled } from "styled-components";

const DropMenu = styled.div`
  display: flex;
  text-align: left;

  &:hover {
    font-weight: 700;
    color: ${({ theme }) => theme.color.green};
  }
`;

const DropDown = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 3rem;
  display: flex;
  flex-direction: column;
  width: 144px;
`;

export { DropDown, DropMenu };
