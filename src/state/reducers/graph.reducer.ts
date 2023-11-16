import { State } from "../state";

export const selectNodeReducer = (state: State, action: { payload: { x: number, y: number } }): State => {
    if(!state.selected){
        const { x, y } = action.payload;
        state.selected = { x, y }
    }
    return state;
}


export const releaseNodeReducer = (state: State): State => {
    state.selected = null;
    return state;
}

export const dragNodeReducer = (state: State, action: { payload: { dx: number, dy: number } }): State => {
    if(state.selected){
        state.selected = {
            x: state.selected.x + action.payload.dx,
            y: state.selected.y + action.payload.dy
        }
    }
    return state;
}