import { Column } from "./column.types"

export type State = {
    headings: Column[],
    data: string[][]
    columnModalIdx: number | null,
    view: {
        textColumn: string
    }
}

export const INITIAL_STATE: State = {
    headings: [
        { name: "Key", type: "KEYWORD" },
        { name: "Summary", type: "FREE_TEXT" },
        { name: "Status", type: "KEYWORD" },
        { name: "Assignee", type: "KEYWORD" }
    ],
    data: [
        ["ABC-001", "Fix the bugs", "Closed", "Jim"],
        ["XYZ-002", "Change the blue", "In Progress", "Ben"],
        ["DEF-003", "Add new feature", "Open", "Sue"],
        ["GHI-004", "Update documentation", "Open", "Tom"],
        ["JKL-005", "Refactor code", "In Progress", "Ben"],
        ["MNO-006", "Improve performance", "Closed", "Jim"],
        ["PQR-007", "Add unit tests", "Open", "Sue"],
        ["STU-008", "Fix security issue", "In Progress", "Tom"],
        ["VWX-009", "Update UI design", "Closed", "Ben"],
        ["YZA-010", "Add new feature", "Open", "Sue"],
        ["BCD-011", "Fix the bugs", "Closed", "Jim"],
        ["EFG-012", "Change the blue", "In Progress", "Ben"],
        ["HIJ-013", "Add new feature", "Open", "Sue"],
        ["KLM-014", "Update documentation", "Open", "Tom"],
        ["NOP-015", "Refactor code", "In Progress", "Ben"],
        ["QRS-016", "Improve performance", "Closed", "Jim"],
        ["TUV-017", "Add unit tests", "Open", "Sue"],
        ["WXY-018", "Fix security issue", "In Progress", "Tom"],
        ["ZAB-019", "Update UI design", "Closed", "Ben"],
        ["CDE-020", "Add new feature", "Open", "Sue"],
        ["FGH-021", "Fix the bugs", "Closed", "Jim"],
        ["IJK-022", "Change the blue", "In Progress", "Ben"],
        ["LMN-023", "Add new feature", "Open", "Sue"],
        ["OPQ-024", "Update documentation", "Open", "Tom"],
        ["RST-025", "Refactor code", "In Progress", "Ben"]
    ],
    columnModalIdx: null,
    view: {
        textColumn: "Assignee"
    }
}