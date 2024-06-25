import langReducer from './features/slice';
import questionsReducer from './features/questionsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        languages: langReducer,
        questions: questionsReducer,
    }
});
