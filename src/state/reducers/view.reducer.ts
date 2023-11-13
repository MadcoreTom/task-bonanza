import { State } from "../state"

export const setViewReducer = (state: State, action: { payload: Partial<typeof state.view> }): State => {
    return {
        ...state,
        view: { ...state.view, ...action.payload }
    }
}