import { configureStore} from "@reduxjs/toolkit";
import todoReducer from "../redux/slices/todoSlice.js";
import authReducer from "../redux/slices/userSlice.js";
import editModeSlice from "../../server/controllers/EditMode.js";

const store = configureStore({
    reducer: {
        todos: todoReducer,
        auth: authReducer,
        editMode: editModeSlice,
    },
});

export default store;