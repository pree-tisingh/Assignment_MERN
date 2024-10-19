import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; 
const API_ = 'http://localhost:5000'; 

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { getState }) => {
    const state = getState();
    const token = state.users.token || localStorage.getItem('token'); 

    if (!token) {
        throw new Error('No token found'); 
    }

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user) => {
    const response = await axios.post(`${API_}/signup`, user);
    return response.data;
});

export const loginUser = createAsyncThunk('users/loginUser', async (user) => {
    const response = await axios.post(`${API_}/login`, user);
    return response.data; 
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }, { getState }) => {
    const state = getState();
    const token = state.users.token || localStorage.getItem('token'); 

    const response = await axios.put(`${API_URL}/${id}`, user, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    return response.data;
});
export const deleteUser = createAsyncThunk('users/deleteUser', async (id, { getState }) => {
    const state = getState();
    const token = state.users.token || localStorage.getItem('token'); 

    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    return id;
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
        currentUser: null, 
        token: null, 
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload; 
            localStorage.setItem('token', action.payload); 
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token'); 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = null; 
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
                state.error = null; 
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload.user; 
                state.token = action.payload.token; 
                localStorage.setItem('token', action.payload.token);
                console.log('Token:', action.payload.token);
                state.error = null; 
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                state.error = null; 
            })
            .addCase(updateUser.rejected, (state, action) => {
                if (action.error.response && action.error.response.status === 401) {
                    state.error = 'Unauthorized access. Please log in again.'; 
                } else {
                    state.error = action.error.message;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
                state.error = null; 
            })
            .addCase(deleteUser.rejected, (state, action) => {
                if (action.error.response && action.error.response.status === 401) {
                    state.error = 'Unauthorized access. Please log in again.'; 
                } else {
                    state.error = action.error.message; 
                }
            });
    },
});

export const { setToken, clearToken } = userSlice.actions;

export default userSlice.reducer;
