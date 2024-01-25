import { configureStore} from "@reduxjs/toolkit";
import todoReducer from "../redux/slices/todoSlice.js";
import authReducer from "../redux/slices/userSlice.js";

const store = configureStore({
    reducer: {
        todos: todoReducer,
        auth: authReducer,
    },
});

export default store;