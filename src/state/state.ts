import { Column } from "./column.types"

export type State = {
    headings: Column[],
    data: string[][]
    columnModalIdx: number | null,
    view: {
        textColumn: string,
        colourColumn: string,
        emojiColumn: string
    }
}

export const INITIAL_STATE: State = {
    headings: [
        { name: "Key", type: "KEYWORD", mapping: {} },
        { name: "Summary", type: "FREE_TEXT" },
        { name: "Status", type: "KEYWORD", mapping: {Closed:{colour:"#888888", emoji:"🏁"},"In Progress":{colour:"blue",emoji:"🏃‍♂️"}}},
        { name: "Assignee", type: "KEYWORD", mapping: {Sue:{colour:"pink", emoji: "💃"},Tom:{emoji:"♥",colour:"blue"}} },
        { name: "X", type: "X" },
        { name: "Y", type: "Y" },
    ],
    data: [
        ["ABC-001", "Fix the bugs", "Closed", "Jim", "100", "100"],
        ["XYZ-002", "Change the blue", "In Progress", "Ben", "200", "203"],
        ["DEF-003", "Add new feature", "Open", "Sue", "300","720"],
        ["DEF-111", "Delete new feature", "Open", "Sue", "400","200"],
        ["GHI-004", "Update documentation", "Open", "Tom", "10", "-50"],
    ],
    columnModalIdx: null,
    view: {
        textColumn: "Summary",
        colourColumn: "Status",
        emojiColumn: "Assignee"
    }
}