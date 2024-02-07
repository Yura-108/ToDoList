import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	visibilityOfForm: false,
}

export const addButtonSlice = createSlice({
	name: 'addButton',
	initialState,
	reducers: {
		changeState: (state, action) => {
			state.visibilityOfForm = action.payload;
		}
	}
});

export const visibilityOfForm = state => state.addButton.visibilityOfForm;

export const {changeState} = addButtonSlice.actions;

export default addButtonSlice.reducer;