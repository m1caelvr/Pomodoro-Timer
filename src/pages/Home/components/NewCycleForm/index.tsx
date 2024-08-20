import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CycleContext";

export function NewCycleForm() {
    const { activeCycle, cycles } = useContext(CyclesContext)
    const { register } = useFormContext() 

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestions"
                disabled={!!activeCycle}
                type="text"
                id="task"
                {...register('task')}
            />

            <datalist id="task-suggestions">
                {
                    cycles.map(cycle => {
                        return <option value={cycle.task} />
                    })
                }
            </datalist>

            <label htmlFor="minutesAmount"></label>
            <MinutesAmountInput
                id="minutesAmount"
                placeholder="00"
                type="number"
                disabled={!!activeCycle}
                step={5}
                min={5}
                max={60}
                {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}