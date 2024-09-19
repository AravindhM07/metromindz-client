import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addUser, fetchUser, login, logout } from '../services/userServices';

export const createUser = createAsyncThunk(
    'user/createUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await addUser(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'user/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchUser();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signInUser = createAsyncThunk(
    'user/signin',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await login(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutCurrentUser = createAsyncThunk(
    'user/signout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await logout();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'signup_succeeded';
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'auth_failed';
                state.error = action.payload;
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(signInUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.status = 'signin_succeeded';
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.status = 'auth_failed';
                state.error = action.payload;
            })
            .addCase(logoutCurrentUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutCurrentUser.fulfilled, (state, action) => {
                state.status = 'logout_succeeded';
                state.currentUser = null;
            })
            .addCase(logoutCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
