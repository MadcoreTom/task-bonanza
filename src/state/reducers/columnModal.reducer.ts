import { Column } from "../column.types"
import { State } from "../state"

export const openColumnModalReducer = (state: State, action: { payload: { idx: number } }): State => {
    return {
        ...state,
        columnModalIdx: action.payload.idx
    }
}


export const closeColumnModalReducer = (state: State): State => {
    return {
        ...state,
        columnModalIdx: null
    }
}

export const saveColumnReducer = (state: State, action: { payload: { columnIdx: number, column: Column } }): State => {
    state.columnModalIdx = null;
    state.headings[action.payload.columnIdx] = action.payload.column;
    return state
}