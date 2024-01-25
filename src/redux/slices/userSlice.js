import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    try {
        const { data } = await axios.post('/auth/login', params);
        return data;
    } catch (err) {
        throw err
    }
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {
    try {
        const { data } = await axios.get('/auth/me');
        return data;
    } catch (err) {
        throw err
    }
})

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params) => {
    try {
        const { data } = await axios.post('/auth/register', params);
        return data;
    } catch (err) {
        throw err
    }
})

const initialState = {
    data: null,
    status: 'loading',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        })
        builder.addCase(fetchUserData.rejected, state => {
            state.data = null;
            state.status = 'error';
        })
        builder.addCase(fetchLogin.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        })
        builder.addCase(fetchLogin.rejected, state => {
            state.data = null;
            state.status = 'error';
        })
        builder.addCase(fetchRegistration.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
        builder.addCase(fetchRegistration.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        })
        builder.addCase(fetchRegistration.rejected, state => {
            state.data = null;
            state.status = 'error';
        })
    }
})


export const {logout} = authSlice.actions
export const isAuthSelector = state => Boolean(state.auth.data)
export default authSlice.reducer