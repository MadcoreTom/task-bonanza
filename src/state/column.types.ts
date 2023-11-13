export const COLUMN_TYPES: { name: string, description: string }[] = [
    { name: "FREE_TEXT", description: "Any value, with no filtering" },
    { name: "NUMBER", description: "A number, filterable and sortable" },
    { name: "KEYWORD", description: "A set of unique values" },
    { name: "KEY", description: "The identifier of the row, uniqeunique and never blank"}
]

export type ColumnType = {
    type: "FREE_TEXT"
} | {
    type: "NUMBER",
    min: number,
    max: number
} | {
    type: "KEYWORD",
    // values: string[]
}

export type Column = {
    name: string,

} & ColumnType