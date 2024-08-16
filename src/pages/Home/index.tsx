import { Play } from "@phosphor-icons/react";
import {
    CountdownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountdownButton,
    TaskInput
} from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
                        type="text"
                        id="task"
                    />
                    <datalist id="task-suggestions">
                        <option value="Manhã" />
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                    </datalist>

                    <label htmlFor="minutesAmount"></label>
                    <MinutesAmountInput
                        id="minutesAmount"
                        placeholder="00"
                        type="number"
                        step={5}
                        min={5}
                        max={60}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}