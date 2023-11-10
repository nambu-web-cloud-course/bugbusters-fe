import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$dir === "row"? "row" : "column")};
  gap: 1rem;
  width: ${(props) => (props.$size === "sm" ? "28.5rem" : "37.5rem")};
  padding: 2rem;
  border-radius: 0.5rem;
  background: white;
  border: 1px solid ${({ theme }) => theme.color.gray02};
  margin-top: 2rem;
`;

export default Container;
