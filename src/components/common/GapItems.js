import styled from "styled-components";

const GapItems = styled.div`
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "left")};
  align-items: ${(props) => (props.left ? "left" : "center")};
  margin-bottom: 0.5rem;
  width: 100%;
  gap: ${(props) => (props.gap ? props.gap : "0.5rem")};
  margin: 0 auto;
  flex-direction: ${(props) => (props.col ? "column" : "row")};
`;

export default GapItems;
