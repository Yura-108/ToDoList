import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/slices/todoSlice.js";
import authReducer from "../redux/slices/userSlice.js";
import editModeSlice from "../redux/slices/editModeSlice.js";
import addButtonSlice from "../redux/slices/addButtonSlice.js";

const store = configureStore({
	reducer: {
		todos: todoReducer,
		auth: authReducer,
		editMode: editModeSlice,
		addButton: addButtonSlice,
	}
});

export default store;