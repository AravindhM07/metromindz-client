import { configureStore } from '@reduxjs/toolkit';

// Slices
import userSlices from './slices/userSlices';

const store = configureStore({
    reducer: {
        user: userSlices,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(), // Return the default middleware array
});

export default store;
