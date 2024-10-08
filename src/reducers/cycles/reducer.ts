import { ActionTypes } from "./actions";
import { produce } from "immer";

export interface Cycle {
    minutesAmount: number;
    interruptDate?: Date;
    finshedDate?: Date;
    startDate: Date;
    task: string;
    id: string;
}

interface CyclesState {
    cycles: Cycle[],
    activeCycleId: string | null,
}

export function cyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        
        case ActionTypes.ADD_NEW_CYCLE: {
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })
        }

        case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex < 0) {
                return state
            }

            return produce(state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interruptDate = new Date()
            })
        }

        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex < 0) {
                return state
            }

            return produce(state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finshedDate = new Date()
            })
        }

        case ActionTypes.REMOVE_CYCLE:
            return {
                ...state,
                cycles: state.cycles.filter(cycle => cycle.id !== action.payload.id),
            };

        default: return state;
    }
}