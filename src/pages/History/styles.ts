import styled from "styled-components";
import { device } from "../../styles/device";

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;

    display: flex;
    flex-direction: column;
    overflow: hidden;

    margin-top: 4rem;

    h1 {
        font-size: 1.5rem;
        color: ${props => props.theme["gray-100"]};
    }

    h2 {
        opacity: .7;
        font-size: .9rem;
        margin-top: 5px;
        font-style: italic;
        font-weight: 500;
    }

    @media ${device.mobileM} {
        padding: 4rem 0;
    }
`;

export var tableFontSize = '1.125rem';

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;
    border-radius: 8px;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        * { text-overflow: ellipsis; }

        th {
            background: ${props => props.theme["gray-600"]};
            padding: 1rem 1.5rem;
            font-size: ${tableFontSize};
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
            font-size: ${tableFontSize};
            line-height: 1.6;
            border-top: 4px solid ${props => props.theme["gray-800"]};
            
            &:first-child {
                width: 40%;
            }

            &, * { white-space: nowrap; }

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
