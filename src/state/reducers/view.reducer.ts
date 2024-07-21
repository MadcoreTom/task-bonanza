import { State } from "../state"

export const setViewReducer = (state: State, action: { payload: Partial<typeof state.view> }): State | undefined => {

    if (action.payload.swimlaneColumnn) {
        const xIdx = state.headings.map((h, i) => h.type == "X" ? i : null).filter(x => x != null)[0] || 0;
        const laneIdx = state.headings.map((h, i) => h.name == action.payload.swimlaneColumnn ? i : null).filter(x => x != null)[0] || 0;

        const head = state.headings[laneIdx];
        if (head.type == "KEYWORD") {
            // return {
            //     ...state,
            //     data: state.data.map(d => {
            //         d[xIdx] = (100 * (head.mapping[d[laneIdx]]?.order || 0)) + "";
            //         return [...d];
            //     }),
            //     view: { ...state.view, ...action.payload }
            // }
            state.data = state.data.map(d => {
                d[xIdx] = (100 * (head.mapping[d[laneIdx]]?.order || 0)) + "";
                return [...d];
            });
            state.view =  { ...state.view, ...action.payload };
            return;
        }
    }
    return {
        ...state,
        view: { ...state.view, ...action.payload }
    }
}