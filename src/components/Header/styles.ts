import styled from "styled-components";
import { device } from "../../styles/device";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: calc(100% - 2.5rem * 2);

    img {
        width: 40px;
        aspect-ratio: 1;
        object-fit: cover;
        filter: drop-shadow( 0 4px 5px #050505);
    }

    nav {
        display: flex;
        gap: 6px;

        a {
            width: 45px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;

            color: ${props => props.theme["gray-100"]};

            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;

            transition: border-bottom 0.2s;

            &.active {
                color: ${props => props.theme["green-500"]};
            }

            &:is(:focus, :hover) {
                box-shadow: none;
                border-bottom: 3px solid ${props => props.theme["green-500"]};
            }
        }
    }

    @media ${device.mobileM} {
        width: 100%;
    }
`;