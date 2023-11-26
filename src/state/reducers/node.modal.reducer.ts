import { measureText } from "../../text-measure-util"
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

export const saveRowReducer = (state: State, action: { payload: { idx: number, row: string[] } }) => {
    const widthIdx = state.headings.map((h, i) => h.type == "W" ? i : null).filter(a => a != null)[0] as number;
    const textIndex = state.headings.map((h, i) => h.name == state.view.textColumn ? i : null).filter(a => a != null)[0] as number;
    const row = [...action.payload.row];
    const m =  measureText(row[textIndex],"14pt serif");
    console.log(m)
    const w =m.width+ "";
    console.log("TEXT",row[textIndex],w)
    row[widthIdx] = "" + w;
    state.data[action.payload.idx] = row;
}
