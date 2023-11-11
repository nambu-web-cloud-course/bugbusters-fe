import { styled } from "styled-components";

const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

export default Wrapper;