import { configureStore} from "@reduxjs/toolkit";
import todoReducer from "../redux/slices/todoSlice.js";

const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});

export default store;