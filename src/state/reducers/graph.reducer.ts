import { State } from "../state";

export const selectNodeReducer = (state: State, action: { payload: { x: number, y: number, idx: number } }): State => {
    if (!state.selected) {
        const { x, y, idx } = action.payload;
        state.selected = { x, y, idx }
    }
    return state;
}


export const releaseNodeReducer = (state: State): State => {
    if(state.selected){
        const row = [...state.data[state.selected.idx]];

        const xIdx = state.headings.map((h, i) => h.type == "X" ? i : null).filter(x => x != null)[0] || 0;
        const yIdx = state.headings.map((h, i) => h.type == "Y" ? i : null).filter(x => x != null)[0] || 0;
        row[xIdx] = ""+state.selected.x;
        row[yIdx] = ""+state.selected.y;

        state.data[state.selected.idx] = row;
    }
    state.selected = null;
    return state;
}

export const dragNodeReducer = (state: State, action: { payload: { dx: number, dy: number } }): State => {
    if (state.selected) {
        state.selected = {
            x: state.selected.x + action.payload.dx,
            y: state.selected.y + action.payload.dy,
            idx: state.selected.idx
        }
    }
    return state;
}