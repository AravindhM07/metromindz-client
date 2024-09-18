import { configureStore } from '@reduxjs/toolkit';

// Slices
import userSlice from './slices/userSlice';
import taskSlice from './slices/taskSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        task: taskSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(), // Return the default middleware array
});

export default store;
