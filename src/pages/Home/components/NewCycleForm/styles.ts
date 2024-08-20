import { styled } from "styled-components";
import { device } from "../../../../styles/device";

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme["gray-100"]};

    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;

    @media ${device.mobileL} {
        font-size: 150%;
    }
`;

const BaseInput = styled.input`
    background: transparent;
    color: ${props => props.theme["gray-100"]};

    font-size: 1.125rem;
    padding: 0 0.5rem;
    height: 2.5rem;

    border: 0;
    border-bottom: 2px solid ${props => props.theme["gray-500"]};

    &::placeholder {
        color: ${props => props.theme["gray-500"]};
    }

    &:focus {
        box-shadow: none;
        border-color: ${props => props.theme["green-500"]};
    }
`;

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-o-calendar-picker-indicator,
    &::-moz-calendar-picker-indicator,
    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }
`;

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`;