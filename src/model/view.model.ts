export enum Axis {
    COLOUR,
    TITLE,
    TEXT,
    EMOJI,
    SWIMLANE,
    ROW,
    ARROW,
    LINE
}

export type ColumnSelection = {
    type: "column",
    name: string
}

export type ViewSelection = {
    type: "view",
    name: string
}

export type Selection = ColumnSelection | ViewSelection;