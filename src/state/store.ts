import { configureStore, createSlice } from '@reduxjs/toolkit'
import { closeColumnModalReducer, openColumnModalReducer, saveColumnReducer } from './reducers/columnModal.reducer'
import { INITIAL_STATE, State } from './state';
import { setViewReducer } from './reducers/view.reducer';
import { closeNodeModalReducer, openNodeModalReducer } from './reducers/node.modal.reducer';
import { dragNodeReducer, releaseNodeReducer, selectNodeReducer } from './reducers/graph.reducer';


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
        closeNodeModal: closeNodeModalReducer,
        selectNode: selectNodeReducer,
        dragNode:dragNodeReducer,
        releaseNode:releaseNodeReducer
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
    closeNodeModal,
    selectNode,
    dragNode,
    releaseNode
} = mainSlice.actions