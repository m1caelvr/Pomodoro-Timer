import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction, removeCycleAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    amountSecundsPassed: number;
    activeCycleId: string | null;
    activeCycle: Cycle | undefined;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
    removeCycle: (id: string) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        cyclesReducer,
        { cycles: [], activeCycleId: null, },
        () => {
            const storedStateAsJSON = localStorage.getItem('@pomodoro-timer:cycles-state-1.0.0');
            if (storedStateAsJSON) {
                try {
                    const parsedState = JSON.parse(storedStateAsJSON);
                    return parsedState || { cycles: [], activeCycleId: null };
                } catch (e) {
                    console.error('Failed to parse stored state:', e);
                    return { cycles: [], activeCycleId: null };
                }
            }
            return { cycles: [], activeCycleId: null };
        }
    )

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
    
    const [amountSecundsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate),
            )
        }
        
        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        
        localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondsPassed(0)
    }

    function removeCycle(id: string) {
        dispatch(removeCycleAction(id));
    }
    
    return (
        <CyclesContext.Provider
        value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecundsPassed,
            setSecondsPassed,
            markCurrentCycleAsFinished,
            createNewCycle,
            interruptCurrentCycle,
            removeCycle,
        }}
    >
        { children }
    </CyclesContext.Provider>
    )
}
