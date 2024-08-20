import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CycleContext";
import { useContext } from "react";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Trash } from "@phosphor-icons/react";

export function History() {
    const { cycles, removeCycle } = useContext(CyclesContext);

    function removeCycleFromHistory(id: string) {
        const updatedCycles = cycles.filter(cycle => cycle.id !== id);
        localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', JSON.stringify({ cycles: updatedCycles, activeCycleId: null }));

        removeCycle(id);
    }

    if (cycles.length !== 0) {
        return (
            <HistoryContainer>
                <h1>Meu histórico</h1>
                <HistoryList>
                    <table>
                        <thead>
                            <tr>
                                <th>Tarefa</th>
                                <th>Duração</th>
                                <th>Início</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cycles.map(cycle => {
                                // console.log(cycle.id);

                                return (
                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount} minutos</td>
                                        <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                            addSuffix: true,
                                            locale: ptBR,
                                        })}</td>
                                        <td>
                                            {cycle.finshedDate && (
                                                <Status color="green">Concluído</Status>
                                            )}

                                            {cycle.interruptDate && (
                                                <Status color="red">Interrompido</Status>
                                            )}

                                            {!cycle.interruptDate && !cycle.finshedDate && (
                                                <Status color="yellow">Em andamento</Status>
                                            )}
                                        </td>
                                        <td>
                                            <button 
                                                type="button"
                                                onClick={() => removeCycleFromHistory(cycle.id)}
                                            >
                                                <Trash size={24} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </HistoryList>
            </HistoryContainer>
        )
    } else {
        return (
            <HistoryContainer>
                <h1>Meu histórico</h1>
                <h2>
                    Voce ainda não possui nenhum ciclo.
                </h2>
            </HistoryContainer>
        )
    }
}