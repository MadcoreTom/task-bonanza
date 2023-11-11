import { configureStore, createSlice } from '@reduxjs/toolkit'

export type State = {
    test: boolean
}

export type RootState = {
    main: State
}

const mainSlice = createSlice({
    name: "main",
    initialState: {
        test: false
    },
    reducers: {

    }
});

export const store = configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});
