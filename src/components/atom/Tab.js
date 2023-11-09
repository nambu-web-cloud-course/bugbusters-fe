import styled from "styled-components";

const Tab = styled.button`
  color: black;
  text-align: center;
  margin-top: 1rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray02};
  width: 100%;
  justify-content: center;
  &:active {
    border-bottom: 2px solid ${({ theme }) => theme.color.green};
  }
`;


export default Tab;
