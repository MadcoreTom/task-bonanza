import { State } from "../store";

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