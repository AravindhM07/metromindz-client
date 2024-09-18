import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTask } from '../services/taskServices';

export const createTasks = createAsyncThunk(
    'task/create',
    async (taskData, { rejectWithValue }) => {
        try {
            const response = await createTask(taskData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(createTasks.rejected, (state, action) => {
                state.status = 'auth_failed';
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
