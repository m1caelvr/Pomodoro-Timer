import { FormProvider, useForm } from "react-hook-form";
import { HandPalm, Play } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";

import { CyclesContext } from "../../contexts/CycleContext";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

import * as zod from 'zod';

import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    owner: zod.string().optional(),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
        .max(60, 'O ciclo precisa ser de no maximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 5,
        },
    });

    const { handleSubmit, watch, /* reset */ } = newCycleForm;



    const task = watch('task');
    const isSubmitDisabled = !task;  

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {
                    activeCycle ? (
                        <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
                            <HandPalm size={24} />
                            Parar
                        </StopCountdownButton>
                    ) : (
                        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={24} />
                            Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}