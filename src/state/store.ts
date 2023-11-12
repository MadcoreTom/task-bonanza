import { configureStore, createSlice } from '@reduxjs/toolkit'

export type State = {
    test: boolean,
    headings: string[],
    data: string[][]
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
        ]
    },
    reducers: {

    }
});

export const store = configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});
