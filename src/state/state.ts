import { Column } from "./column.types"

export type ViewState = {
    textColumn: string,
    colourColumn: string,
    emojiColumn: string
}

export type State = {
    headings: Column[],
    data: string[][]
    columnModalIdx: number | null,
    view: ViewState
}

export const INITIAL_STATE: State = {
    headings: [
        { name: "Key", type: "KEYWORD", mapping: {} },
        { name: "Summary", type: "FREE_TEXT" },
        { name: "Status", type: "KEYWORD", mapping: {Closed:{colour:"#888888", emoji:"🏁"},"In Progress":{colour:"blue",emoji:"🏃‍♂️"}}},
        { name: "Assignee", type: "KEYWORD", mapping: {Sue:{colour:"pink", emoji: "💃"},Tom:{emoji:"♥",colour:"blue"}} },
        { name: "Estimate", type: "NUMBER", min:0 , max:10, minRGB: [0,200,50],maxRGB:[255,50,0]},
        { name: "X", type: "X" },
        { name: "Y", type: "Y" },
    ],
    data: [
        ["ABC-001", "Fix the bugs", "Closed", "Jim", "1","100", "100"],
        ["XYZ-002", "Change the blue", "In Progress","Ben","5", "200", "203"],
        ["DEF-003", "Add new feature", "Open", "Sue", "8","300","720"],
        ["DEF-111", "Delete new feature", "Open", "Sue", "10","400","200"],
        ["GHI-004", "Update documentation", "Open", "Tom","2", "10", "-50"],
    ],
    columnModalIdx: null,
    view: {
        textColumn: "Summary",
        colourColumn: "Estimate",
        emojiColumn: "Assignee"
    }
}