import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CycleContext";

export function NewCycleForm() {
    const { activeCycle, cycles } = useContext(CyclesContext)
    const { register } = useFormContext() 

    return (
        <FormContainer>
            <label htmlFor="task">Vou estudar</label>
            <TaskInput
                placeholder="Nome do ciclo"
                list="task-suggestions"
                disabled={!!activeCycle}
                type="text"
                id="task"
                {...register('task')}
            />

            <datalist id="task-suggestions">
                {
                    cycles.map(cycle => {
                        return <option key={cycle.id} value={cycle.task} />
                    })
                }
            </datalist>

            <label htmlFor="minutesAmount">por</label>
            <MinutesAmountInput
                id="minutesAmount"
                placeholder="00"
                type="number"
                disabled={!!activeCycle}
                min={5}
                max={60}
                {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}