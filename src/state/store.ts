import { configureStore, createSlice } from '@reduxjs/toolkit'
import { closeColumnModalReducer, openColumnModalReducer, saveColumnReducer } from './reducers/columnModal.reducer'
import { INITIAL_STATE, State } from './state';
import { setViewReducer } from './reducers/view.reducer';
import { closeNodeModalReducer, openNodeModalReducer } from './reducers/node.modal.reducer';


export type RootState = {
    main: State
}

const mainSlice = createSlice({
    name: "main",
    initialState: INITIAL_STATE,
    reducers: {
        openColumnModal: openColumnModalReducer,
        closeColumnModal: closeColumnModalReducer,
        setView: setViewReducer,
        saveColumn: saveColumnReducer,
        openNodeModal: openNodeModalReducer,
        closeNodeModal: closeNodeModalReducer
    }
});

export const store = configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const {
    openColumnModal,
    closeColumnModal,
    setView,
    saveColumn,
    openNodeModal,
    closeNodeModal
} = mainSlice.actions