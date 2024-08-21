import { configureStore, createSlice } from "@reduxjs/toolkit"
import { ColumnDef, LinkSelection, Selection, ViewDef } from "../model/view.model"
import { Record } from "../model/data"
import { PALETTE } from "../colour"
import { LayoutHelpers } from "./layout.reducer"

export type State = {
    records: Record[],
    selected: Selection | null,
    changeQueue: { row: number, column: number, value: string }[],
    tab: number,
    columns: ColumnDef[],
    views: ViewDef[],
    stagedData: string[][] | null,
    offset: [number, number]
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
        { columns: ["V-1", "Recenter View", "Ability to re-centre when you get lost", "View", "2", "Tom", "Done", ""] },
        { columns: ["N-1", "Fit Text", "Fit text to node, or wrap the text if that's better", "Node", "4", "Tom", "Done", ""] },
        { columns: ["N-2", "Auto Arrows", "Automatically organise nodes when arrows change", "Node", "4", "Tom", "New", ""] },
        { columns: ["N-3", "Tidy Arrows", "The arrow experience could be better", "Node", "2", "Tom", "New", ""] },
        { columns: ["N-4", "Arrows to null", "Arrows to nodes with empty IDs appear", "Node", "2", "Tom", "New", ""] },
        { columns: ["N-5", "Node styling", "Current rounded rectangles look ugly", "Node", "1", "Tom", "Done", ""] },
        { columns: ["V-2", "Sortable Swimlanes", "Make swimlanes sortable and filterable", "View", "3", "Tom", "In Progress", ""] },
        { columns: ["V-2", "Add/Remove View", "Add or remove views with the + button", "View", "1", "Tom", "Done", ""] },
        { columns: ["F-1", "Export CSV", "Export data as CSV", "File", "4", "Tom", "Done", "F-2,F-3"] },
        { columns: ["F-2", "Save", "Save data and views", "File", "4", "Tom", "New", ""] },
        { columns: ["F-3", "Load", "Load data and views", "File", "4", "Tom", "New", ""] },
        { columns: ["C-1", "Ribbon Styling", "Tidy up the ribbon & tabs", "Controls", "3", "Tom", "New", ""] },
        { columns: ["D-1", "Keyword Columns", "Better order and colour choice", "Columns", "3", "Tom", "In Progress", ""] },
        { columns: ["D-2", "Number Columns", "Clearer colour choice, auto/manual min/max", "Columns", "3", "Tom", "In Progress", ""] },
        { columns: ["X-1", "Dataset", "Make the test dataset issue tracking for this project", "Other", "1", "Tom", "Done", ""] },
    ],
    changeQueue: [],
    tab: 0,
    columns: [
        { name: "ID", type: "Alphabetical" },
        { name: "Summary", type: "Alphabetical" },
        { name: "Description", type: "Alphabetical" },
        { name: "Category", type: "Keyword", map: { "View": { colour: PALETTE[0] }, "Node": { colour: PALETTE[1] }, "File": { colour: PALETTE[4] }, "Controls": { colour: PALETTE[9] } } },
        { name: "Effort", type: "Number", minColour: [122.00000000000011, 80, 80], maxColour: [338, 80, 60], minVal:0, maxVal: 8 },
        { name: "Assignee", type: "Keyword", map: { "unassigned": { colour: PALETTE[0] }, "Tom": { colour: PALETTE[12] }, "Chim Richalds": { colour: PALETTE[6] } } },
        { name: "Status", type: "Keyword", map: { "New": { colour: PALETTE[0] }, "Done": { colour: PALETTE[2] }, "In Progress": { colour: PALETTE[4] }, "Testing": { colour: PALETTE[8] } } },
        { name: "Blocks", type: "Link", references: 0 }
    ],
    views: [
        {
            name: "Kanban",
            title: 1,
            colour: 4,
            emoji: null,
            row: null,
            swimlane: 6,
            swimlanes: ["New", "In Progress", "Done"],
            text: 2,
            arrows: null,
            data: [],
            dirty: true
        },
        {
            name: "Flow",
            title: 0,
            text: 1,
            colour: 4,
            emoji: null,
            row: null,
            swimlane: null,
            arrows: 7,
            data: [],
            dirty: true
        }
    ],
    stagedData: null,
    offset: [0, 0]
}

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setTab: (state: State, action: { payload: number }) => {
            if (state.tab != action.payload) {
                if (state.tab == -1) {
                    commitRecordsA(state);
                }
                state.tab = action.payload;
            }
            if (state.tab >= 0) {
                state.selected = { type: "view", idx: state.tab };
                if (state.views[state.tab].dirty) {
                    LayoutHelpers.layout(state);
                }
            } else {
                state.selected = null;
            }
        },
        autoAlign:(state:State)=>{
            if (state.tab >= 0) {
                LayoutHelpers.layout(state);
            }
        },
        setSelection: (state: State, action: { payload: Selection | "currentView" | null }) => {
            if (action.payload === "currentView") {
                state.selected = { type: "view", idx: state.tab };
            } else {
                state.selected = action.payload;
            }
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
            const oldSwimlane = state.views[idx].swimlane;
            state.views[idx] = def;
            // If there are swimlanes, populate them
            if (def.swimlane != null) {
                if (def.swimlanes == undefined || def.swimlane != oldSwimlane) {
                    LayoutHelpers.calcSwimlanes(state);
                }
            } else if (def.swimlanes != undefined) {
                def.swimlanes == undefined;
            }
            console.log("v", def)
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
                if (state.views[state.tab].swimlane == null) {
                    state.selected.pos[0] += action.payload.delta[0];
                }
                state.selected.pos[1] += action.payload.delta[1];
            }
        },
        addRow: (state: State) => {
            const row: Record = {
                columns: state.columns.map(() => "")
            };
            state.records.push(row);
            commitRecordsA(state);
        },
        addColumn: (state: State) => {
            state.columns.push({
                name: "new Column",
                type: "Alphabetical"
            });
            state.records.forEach(r => {
                r.columns.push("");
            });
            commitRecordsA(state);
        },
        stageData: (state: State, action: { payload: string[][] }) => {
            state.stagedData = action.payload;
        },
        importStagedData: (state: State) => {
            console.log("Importing")
            if (state.stagedData) {
                const headers = state.stagedData.shift() as string[];
                state.columns = headers.map(h => {
                    return {
                        name: h,
                        type: "Alphabetical"
                    }
                });
                state.records = state.stagedData.map(row => {
                    return { id: "1", columns: row }
                })
            }
            state.stagedData = null;
        },
        clickNode: (state: State, action: { payload: { idx: number, pos: [number, number] } }) => {
            const sel = state.selected;
            if (sel && sel.type == "link" && sel.endIdx == undefined) {
                if (sel.startIdx == undefined) {
                    console.log("LINKING1");
                    (state.selected as LinkSelection).startIdx = action.payload.idx;
                    (state.selected as LinkSelection).pos = action.payload.pos;
                    (state.selected as LinkSelection).mouse = [...action.payload.pos];
                }
            } else {
                state.selected = { type: "node", idx: action.payload.idx, mouseDown: true, pos: action.payload.pos }
            }
        },
        mouseUpNode: (state: State, action: { payload: { idx: number, pos: [number, number] } }) => {
            const sel = state.selected;
            if (sel && sel.type == "link" && sel.startIdx != undefined && sel.endIdx == undefined) {
                sel.endIdx = action.payload.idx;
                console.log("LINKING3");
                const arrows = state.views[state.tab]?.arrows;
                if (arrows != null) {
                    const cur = state.records[sel.startIdx].columns[arrows];
                    if (cur && cur.length > 0) {
                        state.records[sel.startIdx].columns[arrows] = cur + "," + state.records[sel.endIdx].columns[0];
                    } else {
                        state.records[sel.startIdx].columns[arrows] = state.records[sel.endIdx].columns[0];
                    }
                }
            }
            // TODO same as releaseNode
            if (state.selected && state.selected.type == "node" && state.selected.mouseDown) {
                state.views[state.tab].data[state.selected.idx] = {
                    pos: [state.selected.pos[0], state.selected.pos[1]]
                }
                state.selected = { ...state.selected, mouseDown: false };
            }
        },
        reCentre: LayoutHelpers.reCentreFunc,
        setOffset: (state: State, action: { payload: [number, number] }) => {
            state.offset = action.payload;
        },
        addView: (state: State) => {
            state.views.push({
                name: "New View",
                title: 0,
                text: 1,
                arrows: null,
                colour: null,
                dirty: true,
                emoji: null,
                row: null,
                swimlane: null,
                data: []
            });
            state.tab = state.views.length-1;
            state.selected = {
                type: "view",
                idx: state.tab
            }
        },
        removeSelectedView:(state:State)=>{
            state.views.splice(state.tab, 1);
            state.tab = state.tab -1;
            if(state.tab > -1){
                state.selected = {type:"view", idx:state.tab}
            } else {
                state.selected = null;
            }
        }
    }
});

export const STORE = configureStore({
    reducer: {
        main: mainSlice.reducer
    }
});

export const { setSelection, setOffset, clearSelection, commitRecords, setCell, reCentre, setTab, updateColumn, updateView, releaseNode, dragNode, addRow, addColumn, stageData, importStagedData, removeSelectedView,clickNode, mouseUpNode, addView, autoAlign } = mainSlice.actions;