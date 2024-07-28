import { Record, ViewRecord } from "./model/data"

type State = {
 
    views: { [name: string]: ViewRecord[] }
}

export const STATE: State = {

    views: {
        table: [],
        dependency: []
    }
}