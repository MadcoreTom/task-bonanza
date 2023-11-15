export const COLUMN_TYPES: { name: string, description: string }[] = [
    { name: "FREE_TEXT", description: "Any value, with no filtering" },
    { name: "NUMBER", description: "A number, filterable and sortable" },
    { name: "KEYWORD", description: "A set of unique values" },
    { name: "KEY", description: "The identifier of the row, uniqeunique and never blank" },
    { name: "X", description: "x co-ordinate" },
    { name: "Y", description: "y co-ordinate" }
]

export type KeywordMeta = {colour?:string,order?:number,emoji?:string};

export type ColumnType = {
    type: "FREE_TEXT"
} | {
    type: "NUMBER",
    min: number,
    max: number,
    minRGB: [number,number,number],
    maxRGB: [number,number,number]
} | {
    type: "KEYWORD",
    mapping: {[key:string] : KeywordMeta}
    // values: string[]
} | {
    type: "X" | "Y"
}

export type Column = {
    name: string,

} & ColumnType