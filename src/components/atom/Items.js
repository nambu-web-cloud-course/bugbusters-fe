import styled from "styled-components";

const Items = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const GapItems = styled(Items)`
  gap: 0.5rem;
  margin: 0 auto;
`;

export { Items, GapItems };
