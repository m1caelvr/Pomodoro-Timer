import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ::-webkit-scrollbar {
        width: 4px;

        &-thumb {
            background-color: ${props => props.theme['gray-600']};
            border-radius: 999rem;
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
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`;
