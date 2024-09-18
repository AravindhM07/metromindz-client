import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTask, fetchTasks, deleteTask } from '../services/taskServices';

export const createTasks = createAsyncThunk(
    'task/createTask',
    async (taskData, { rejectWithValue }) => {
        try {
            const response = await createTask(taskData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchTasksList = createAsyncThunk(
    'task/fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchTasks();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteRequest = createAsyncThunk(
    'task/deleteTask',
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteTask(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'task',
    initialState: {
        status: 'idle',
        tasksList: [],
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
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchTasksList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasksList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasksList = action.payload;
            })
            .addCase(fetchTasksList.rejected, (state, action) => {
                state.status = 'auth_failed';
                state.error = action.payload;
            })
            .addCase(deleteRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasksList = action.payload;
            })
            .addCase(deleteRequest.rejected, (state, action) => {
                state.status = 'auth_failed';
                state.error = action.payload;
            })
    }
});

export default userSlice.reducer;
