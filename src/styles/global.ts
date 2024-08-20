import { createGlobalStyle } from "styled-components";
import { device } from "./device";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;

        &-thumb {
            background-color: ${props => props.theme['gray-600']};
            border-radius: 999rem;
            width: 4px;
            height: 4px;
        }

        &-track {
            background-color: transparent;
        }
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
    }

    body {
        background-color: ${props => props.theme['gray-900']};
        color: ${props => props.theme['gray-300']};
        -webkit-font-smoothing: antialiased;
        margin-inline: 5rem;
        overflow: hidden auto;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    @media ${device.laptop} {
        :root {
            font-size: 87.5%;
        }
        body { margin-inline: 4rem; }
    }
    @media ${device.tablet} {
        :root {
            font-size: 75%;
        }
        body { margin-inline: 3rem; }
    }
    @media ${device.mobileL} {
        :root {
            font-size: 62.5%;
        }
        body { margin-inline: 2rem; }
    }
    @media ${device.mobileM} {
        body { background-color: ${props => props.theme['gray-800']}; }
    }
    @media ${device.mobileS} {
        :root {
            font-size: 50%;
        }
    }
`;




// 22 - 200
// 20 - 150
// 18 - 125
// 16 - 100
// 14 - 87.5
// 12 - 75
// 10 - 62.5
// 8 - 50
// 6 - 37.5
