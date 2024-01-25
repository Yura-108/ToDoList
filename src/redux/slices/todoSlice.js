import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchTodos =
    createAsyncThunk('todos/fetchTodos', async () => {
        try {
            const { data } = await axios.get('/tasks');
            return data;
        } catch (err) {
            throw err;
        }
    })

const initialState = {
    todos: {
        items: [],
        status: 'loading'
    },
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdd: (state, action) => {
            state.todos.items.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.todos.items = [];
            state.todos.status = 'loading';
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos.items = action.payload;
            state.todos.status = 'loaded';
        })
        builder.addCase(fetchTodos.rejected, state => {
            state.todos.items = [];
            state.todos.status = 'error';
        })
    }
});
export const {todoAdd} = todoSlice.actions
export default todoSlice.reducer;