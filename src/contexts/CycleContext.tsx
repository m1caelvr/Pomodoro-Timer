import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycle {
    minutesAmount: number;
    interruptDate?: Date;
    finshedDate?: Date;
    startDate: Date;
    task: string;
    id: string;
}

interface CyclesContextType {
    cycles: Cycle[];
    amountSecundsPassed: number;
    activeCycleId: string | null;
    activeCycle: Cycle | undefined;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycledId] = useState<string | null>(null)
    const [amountSecundsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        setCycles((state) =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return {...cycle, finshedDate: new Date() }
                } else {
                    return cycle;
                }
            }),
        )
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        setCycles((state) => [...state, newCycle]);
        setActiveCycledId(id);
        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {

        setCycles(
            cycles.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return {...cycle, interruptDate: new Date()}
                } else {
                    return cycle;
                }
            }),
        )

        setActiveCycledId(null)
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
        }}
    >
        { children }
    </CyclesContext.Provider>
    )
}
