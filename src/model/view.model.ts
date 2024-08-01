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
    idx: number
}

export type NodeSelection = {
    type: "node",
    idx: number
} & (
    {mouseDown:false} |
    {mouseDown:true, pos:[number,number]}
)

export type Selection = ColumnSelection | ViewSelection | NodeSelection;

export type ColumnDef = {
    name: string
}

export type ViewDef = {
    name: string,
    title: null | number,
    colour: null | number,
    emoji: null | number,
    data: {pos:[number,number]}[]
}