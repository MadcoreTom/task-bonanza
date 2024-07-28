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
    idx: number
}

export type ViewSelection = {
    type: "view",
    name: string
}

export type Selection = ColumnSelection | ViewSelection;

export type ColumnDef = {
    name: string
}