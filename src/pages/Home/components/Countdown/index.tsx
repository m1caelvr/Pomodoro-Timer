import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CycleContext";

export function Countdown() {
    const {
        activeCycle,
        activeCycleId,
        amountSecundsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
    } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;

        if (activeCycle) { 
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    new Date(activeCycle.startDate),
                )

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished();
                    setSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setSecondsPassed(secondsDifference);
                }

            }, 1000);
        }

        return () => {
            clearInterval(interval)
        }

    }, [
        activeCycle,
        totalSeconds,
        activeCycleId,
        setSecondsPassed,
        markCurrentCycleAsFinished,
    ])

    const currentSecunds = activeCycle ? totalSeconds - amountSecundsPassed : 0;

    const minutesAmount = Math.floor(currentSecunds / 60);
    const secondsAmount = currentSecunds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const secunds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${secunds}`;
        } else {
            document.title = 'Pomodoro timer';
        }
    }, [minutes, secunds, activeCycle])

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{secunds[0]}</span>
            <span>{secunds[1]}</span>
        </CountdownContainer>
    )
}