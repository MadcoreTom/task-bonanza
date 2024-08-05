import { HSL } from "../colour"

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
        { mouseDown: false } |
        { mouseDown: true, pos: [number, number] }
    )

export type Selection = ColumnSelection | ViewSelection | NodeSelection;

export type KeywordColumnDef = {
    name:string,
    type: "Keyword",
    map: { [id: string]: ColumnDefKeywordMapItem }
};

export type LinkColumnDef = {
    name: string,
    type: "Link",
    references: number
}

export type ColumnDef = {
    name: string,
} & (
        {
            type: "Number",
            minColour: HSL,
            maxColour: HSL
        } | {
            type: "Alphabetical"
        } 
    ) | KeywordColumnDef | LinkColumnDef

export type ColumnDefKeywordMapItem = { colour?: HSL };

export type ViewDef = {
    name: string,
    title: null | number,
    text: null | number,
    colour: null | number,
    emoji: null | number,
    row: null | number,
    swimlane: null | number,
    arrows: null | number,
    data: { pos: [number, number] }[]
}