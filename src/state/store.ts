import { configureStore, createSlice } from "@reduxjs/toolkit"
import { Selection } from "../model/view.model"

export type State = {
    selected: Selection | null
}

export type RootState = {
    main: State
}

const mainSlice = createSlice({
    name: "main",
    initialState: {
        selected: null
    },
    reducers: {
        setSelection: (state: State, action: { payload: Selection }) => {
            state.selected = action.payload
        },
        clearSelection: (state: State) => {
            state.selected = null;
        }
    }
});

export const STORE = configureStore({
    reducer: {
        main: mainSlice.reducer
    }
});

export const { setSelection, clearSelection } = mainSlice.actions;