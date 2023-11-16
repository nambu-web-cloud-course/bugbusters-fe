import styled from "styled-components";

const Items = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const GapItems = styled(Items)`
  width: 100%;
  gap: 0.5rem;
  margin: 0 auto;
`;

export { Items, GapItems };
