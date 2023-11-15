import { State } from "../state"

export const openNodeModalReducer = (state: State, action: { payload: number }): State => {
    return {
        ...state,
        nodeModalIdx: action.payload
    }
}


export const closeNodeModalReducer = (state: State): State => {
    return {
        ...state,
        nodeModalIdx: null
    }
}
