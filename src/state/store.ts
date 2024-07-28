import { configureStore, createSlice } from "@reduxjs/toolkit"
import { ColumnDef, Selection } from "../model/view.model"
import { Record } from "../model/data"

export type State = {
    records: Record[],
    selected: Selection | null,
    changeQueue: {row:number,column:number, value:string}[],
    tab: number,
    columns: ColumnDef[]
}

export type RootState = {
    main: State
}

function  commitRecordsA(state: State) {
    let q;
    while((q = state.changeQueue.pop()) != null){
        console.log("APPLY", {...q})
        state.records[q.row].columns[q.column]=q.value;
    }
}

const mainSlice = createSlice({
    name: "main",
    initialState: {
        selected: null,
        records: [
            { id: "a", columns: ["a", "b", "123", "c"] },
            { id: "b", columns: ["x", "y", "z", ""] }
        ],
        changeQueue: [],
        tab: 0,
        columns: [
            {name:"Ticket"},
            {name:"Story Points"},
            {name:"Assignee"},
            {name:"status"}
        ]
    },
    reducers: {
        setTab:(state:State, action:{payload:number})=>{
            if(state.tab != action.payload){
                if(state.tab == 0){
                    commitRecordsA(state);
                }
                state.tab = action.payload;
            }
        },
        setSelection: (state: State, action: { payload: Selection }) => {
            state.selected = action.payload
        },
        clearSelection: (state: State) => {
            state.selected = null;
        },
       commitRecords:commitRecordsA,
        setCell: (state: State, action: { payload: { value: string, row: number, column: number } }) => {
            const { value, row, column } = action.payload;
            if (value != undefined) {
                state.changeQueue.push({row,column,value})
            }
        },
    }
});

export const STORE = configureStore({
    reducer: {
        main: mainSlice.reducer
    }
});

export const { setSelection, clearSelection, commitRecords, setCell, setTab } = mainSlice.actions;