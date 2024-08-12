export type Record = {
    columns: string[]
}

export type ViewRecord = {
    order: number,
    record: Record
}

export type Column = {
    colours: (value:string, idx:number)=>string | {[id:string]:string} | null
}