import styled from "styled-components";
import { device } from "../../styles/device";

export const LayoutContainer = styled.div`
    max-width: 74rem;
    height: calc(100vh - 10rem);
    margin: 5rem auto;
    padding: 2.5rem;

    background: ${props => props.theme['gray-800']};
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    position: relative;

    @media ${device.mobileM} {
        max-width: 100vw;
        margin: 5rem auto;
        max-height: 100vh;
        padding: 0;
    }
`;