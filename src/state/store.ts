import { configureStore, createSlice } from "@reduxjs/toolkit"
import { ColumnDef, Selection, ViewDef } from "../model/view.model"
import { Record } from "../model/data"

export type State = {
    records: Record[],
    selected: Selection | null,
    changeQueue: { row: number, column: number, value: string }[],
    tab: number,
    columns: ColumnDef[],
    views: ViewDef[]
}

export type RootState = {
    main: State
}

function commitRecordsA(state: State) {
    let q;
    while ((q = state.changeQueue.pop()) != null) {
        console.log("APPLY", { ...q })
        state.records[q.row].columns[q.column] = q.value;
    }
}

const initialState: State = {
    selected: null,
    records: [
        { id: "a", columns: ["BUG-001", "12", "Chim Richalds", "New"] },
        { id: "b", columns: ["BUG-002", "4", "Bobson Dugnutt", "In Progress"] },
        { id: "b", columns: ["FEAT-001", "13", "Bobson Dugnutt", "New"] }
    ],
    changeQueue: [],
    tab: 0,
    columns: [
        { name: "Ticket", type: "Keyword", map: {} },
        { name: "Story Points", type: "Number", minColour: [122.00000000000011, 80, 80], maxColour: [338, 80, 60] },
        { name: "Assignee", type: "Alphabetical", minColour: [0, 50, 40], maxColour: [255, 80, 90] },
        { name: "Status", type: "Keyword", map: {} }
    ],
    views: [
        {
            name: "Kanban",
            title: 0,
            colour: 3,
            emoji: null,
            row: null,
            swimlane: null,
            text: 2,
            data: []
        },
        {
            name: "Assignees",
            title: 1,
            colour: 2,
            emoji: 2,
            row: null,
            swimlane: null,
            text: 0,
            data: []
        }
    ]
}

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setTab: (state: State, action: { payload: number }) => {
            if (state.tab != action.payload) {
                if (state.tab == 0) {
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
        commitRecords: commitRecordsA,
        setCell: (state: State, action: { payload: { value: string, row: number, column: number } }) => {
            const { value, row, column } = action.payload;
            if (value != undefined) {
                state.changeQueue.push({ row, column, value })
            }
        },
        updateColumn: (state: State, action: { payload: { idx: number, def: ColumnDef } }) => {
            const { idx, def } = action.payload;
            state.columns[idx] = def;
        },
        updateView: (state: State, action: { payload: { idx: number, def: ViewDef } }) => {
            const { idx, def } = action.payload;
            console.log("AA", action.payload)
            state.views[idx] = def;
        },
        releaseNode: (state: State) => {
            if (state.selected && state.selected.type == "node" && state.selected.mouseDown) {
                state.views[state.tab].data[state.selected.idx] = {
                    pos: [state.selected.pos[0], state.selected.pos[1]]
                }
                state.selected = { ...state.selected, mouseDown: false };
            }
        },
        dragNode: (state: State, action: { payload: { delta: [number, number] } }) => {
            if (state.selected && state.selected.type == "node" && state.selected.mouseDown) {
                state.selected.pos[0] += action.payload.delta[0];
                state.selected.pos[1] += action.payload.delta[1];
            }
        },
        addRow: (state: State) =>{
            const row:Record = {
                id: "not using this yet",
                columns: state.columns.map(()=>"")
            };
            state.records.push(row);
            commitRecordsA(state);
        },
        addColumn: (state: State) =>{
            state.columns.push({
                name: "new Column",
                type: "Alphabetical",
                minColour: [0,0,0],
                maxColour:[255,255,255]
            });
            state.records.forEach(r=>{
                r.columns.push("");
            });
            commitRecordsA(state);
        }
    }
});

export const STORE = configureStore({
    reducer: {
        main: mainSlice.reducer
    }
});

export const { setSelection, clearSelection, commitRecords, setCell, setTab, updateColumn, updateView, releaseNode, dragNode, addRow, addColumn } = mainSlice.actions;