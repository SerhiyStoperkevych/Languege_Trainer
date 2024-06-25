import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    language: []
};

const langSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {
        press: (state, action) => {
            state.language.push(action.payload);
        },
        remove: (state, action) => {
            state.language = state.language.filter(language => language.id !== action.payload);
        },
        clear: () => initialState
    }
});

export const { press, remove, clear } = langSlice.actions;
export default langSlice.reducer;
