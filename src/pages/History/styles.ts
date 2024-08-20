import styled from "styled-components";

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;

    display: flex;
    flex-direction: column;
    overflow: hidden;

    h1 {
        font-size: 1.5rem;
        color: ${props => props.theme["gray-100"]};
    }

    > p h2 {
        opacity: .7;
        font-size: 1rem;
        margin-top: 4px;
        font-style: italic;
    }
`;

export const HistoryList = styled.div`
    flex: 1;
    overflow: hidden auto;
    margin-top: 2rem;
    border-radius: 8px;

    table { 
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th {
            background: ${props => props.theme["gray-600"]};
            padding: 1rem 1.5rem;
            font-size: 0.875rem;
            line-height: 1.6;
            text-align: left;
            color: ${props => props.theme["gray-100"]};
            
            &:first-child {
                border-top-left-radius: 8px;
            }  

            &:last-child {
                border-top-right-radius: 8px;
            }
        }

        td {
            background: ${props => props.theme["gray-700"]};
            padding: 1rem 1.5rem;
            font-size: 0.875rem;
            line-height: 1.6;
            border-top: 4px solid ${props => props.theme["gray-800"]};
            
            &:first-child {
                width: 40%;
                /* padding-left: 1.5rem; */
            }

            &:last-child {
                /* padding-right: 1.5rem; */
            }

            button {
                width: 3rem;
                height: 3rem;
                display: flex;
                justify-content: center;
                align-items: center;

                color: ${props => props.theme["gray-100"]};
                background: transparent;

                border: none;
                border-top: 3px solid transparent;
                border-bottom: 3px solid transparent;
                border-radius: 5px;

                transition: border-bottom 0.2s;
                cursor: pointer;

                &.active {
                    color: ${props => props.theme["green-500"]};
                }

                &:hover {
                    border-bottom: 3px solid ${props => props.theme["green-500"]};
                }

                &:not(:focus) {
                    box-shadow: none;
                }
            }
        }
    }
`;

const SATATUS_COLORS = {
    yellow: 'yellow-500',
    red: 'red-500',
    green: 'green-500'
} as const

interface StatusProps {
    color: keyof typeof SATATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${(props) => props.theme[SATATUS_COLORS[props.color]]};
    }
`;
