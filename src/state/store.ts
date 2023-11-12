import { configureStore, createSlice } from '@reduxjs/toolkit'
import { closeColumnModalReducer, openColumnModalReducer } from './reducers/columnModal.reducer'

export type State = {
    test: boolean,
    headings: string[],
    data: string[][]
    columnModalIdx: number | null
}

export type RootState = {
    main: State
}

const mainSlice = createSlice({
    name: "main",
    initialState: {
        test: false,
        headings: ["Key", "Summary", "Status", "Assignee"],
        data: [
            ["ABC-123", "Fix the bugs", "Closed", "Jim"],
            ["XYZ-999", "Change the blue", "In Progress", "Ben"],
            ["ABC-123", "Fix the bugs", "Closed", "Jim"],
            ["XYZ-999", "Change the blue", "In Progress", "Ben"],
            ["ABC-123", "Fix the bugs", "Closed", "Jim"],
            ["XYZ-999", "Change the blue", "In Progress", "Ben"],
            ["ABC-123", "Fix the bugs", "Closed", "Jim"],
            ["XYZ-999", "Change the blue", "In Progress", "Ben"],
            ["ABC-123", "Fix the bugs", "Closed", "Jim"],
            ["XYZ-999", "Change the blue", "In Progress", "Ben"],
            ["ABC-123", "Fix the bugs", "Closed", "Jim"],
            ["XYZ-999", "Change the blue", "In Progress", "Ben"],
            ["ABC-123", "Fix the bugs", "Closed", "Jim"],
            ["XYZ-999", "Change the blue", "In Progress", "Ben"],
            ["ABC-123", "Fix the bugs", "Closed", "Jim"],
            ["XYZ-999", "Change the blue", "In Progress", "Ben"],
        ],
        columnModalIdx: null
    },
    reducers: {
        openColumnModal:openColumnModalReducer,
        closeColumnModal:closeColumnModalReducer
    }
});

export const store = configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const {
    openColumnModal,
    closeColumnModal
} = mainSlice.actions