import { SliceCaseReducers } from "@reduxjs/toolkit";
import { State } from "../store";

export const openColumnModalReducer :SliceCaseReducers<State> = (state: State, action: { payload: { idx: number } }): State => {
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