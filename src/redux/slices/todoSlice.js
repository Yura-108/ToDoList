import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchTodos =
	createAsyncThunk("todos/fetchTodos", async () => {
		try {
			const { data } = await axios.get("/tasks");
			return data;
		} catch (err) {
			throw err;
		}
	});
export const fetchAddTodo =
	createAsyncThunk("todos/fetchAddTodo", async (params) => {
		try {
			const { data } = await axios.post("/tasks", params);
			return data;
		} catch (err) {
			throw err;
		}
	});

export const fetchDeleteTodo =
	createAsyncThunk("todos/fetchDeleteTodo", async (id) => {
		try {
			await axios.delete(`/tasks/${id}`);
		} catch (err) {
			throw err;
		}
	});

export const fetchEditTodo =
	createAsyncThunk("todos/fetchEditTodo", async (obj) => {
		try {
			await axios.patch(`/tasks/${obj._id}`, obj);
		} catch (err) {
			throw err;
		}
	});

const initialState = {
	todos: {
		items: [],
		status: "loading"
	}
};

export const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// fetchTodos
		builder.addCase(fetchTodos.pending, (state) => {
			state.todos.items = [];
			state.todos.status = "loading";
		});
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state.todos.items = action.payload;
			state.todos.status = "loaded";
		});
		builder.addCase(fetchTodos.rejected, state => {
			state.todos.items = [];
			state.todos.status = "error";
		});
		// fetchAddTodo
		builder.addCase(fetchAddTodo.pending, (state) => {
			state.todos.status = "loading";
		});
		builder.addCase(fetchAddTodo.fulfilled, (state, action) => {
			state.todos.items.unshift(action.payload);
			state.todos.status = "loaded";
		});
		builder.addCase(fetchAddTodo.rejected, state => {
			state.todos.status = "error";
		});
		// fetchDeleteTodo
		builder.addCase(fetchDeleteTodo.pending, (state, action) => {
			state.todos.items = state.todos.items.filter(obj => obj._id !== action.meta.arg);
		});
		builder.addCase(fetchDeleteTodo.rejected, state => {
			state.todos.status = "error";
		});
		// fetchEditTodo
		builder.addCase(fetchEditTodo.pending, (state) => {
			state.todos.status = "loading";
		});
		builder.addCase(fetchEditTodo.fulfilled, (state, action) => {
			state.todos.items = state.todos.items.map(item => {
				if (item._id === action.meta.arg._id) {
					return action.meta.arg;
				} else {
					return item;
				}
			});
			state.todos.status = "loaded";
		});
		builder.addCase(fetchEditTodo.rejected, state => {
			state.todos.status = "error";
		});
	}
});
export default todoSlice.reducer;