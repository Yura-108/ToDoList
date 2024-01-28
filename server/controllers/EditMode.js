import {createSlice} from "@reduxjs/toolkit";
import {act} from "react-dom/test-utils";

const initialState = {
    mode: false,
    id: 0,
}

export const editModeSlice = createSlice({
    name: 'editMode',
    initialState,
    reducers: {
        toggle: (state, action) => {
            state.mode = !state.mode;
            state.id = action.payload;
        }
    }
})

export const mode = state => state.editMode.mode;
export const id = state => state.editMode.id;
export const { toggle } = editModeSlice.actions;
export default editModeSlice.reducer;