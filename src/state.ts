import { Record, ViewRecord } from "./model/data"

type State = {
    records: Record[],
    views: { [name: string]: ViewRecord[] }
}

export const STATE: State = {
    records: [
        { id: "a", columns: ["a", "b", "123", "c"] },
        { id: "b", columns: ["x", "y", "z", ""] }
    ],
    views: {
        table: [],
        dependency: []
    }
}