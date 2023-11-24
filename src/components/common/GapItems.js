import styled from "styled-components";

const GapItems = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$center ? "center" : "left")};
  align-items: ${(props) => (props.$left ? "left" : "center")};
  margin-bottom: 0.5rem;
  width: 100%;
  gap: ${(props) => (props.$gap ? props.$gap : "0.5rem")};
  margin: 0 auto;
  flex-direction: ${(props) => (props.$col ? "column" : "row")};
  flex-wrap: ${(props) => (props.$wrap? "wrap" : "nowrap")};
  border-radius: ${(props) => (props.$borderRadius? props.$borderRadius : "0")};
  padding: ${(props) => (props.$padding? props.$padding : "0")};
  background-color: ${(props) => (props.$bgColor? props.$bgColor : "none")}
`;

export default GapItems;
