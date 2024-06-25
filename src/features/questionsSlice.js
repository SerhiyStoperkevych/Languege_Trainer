import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: []
};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: (state, action) => {
            state.questions.push({
                id: Date.now(),
                question: action.payload,
                options: []
            });
        },
        addOption: (state, action) => {
            const { questionId, option } = action.payload;
            const question = state.questions.find(q => q.id === questionId);
            if (question) {
                question.options.push({
                    id: Date.now(),
                    text: option
                });
            }
        },
        removeQuestion: (state, action) => {
            state.questions = state.questions.filter(q => q.id !== action.payload);
        },
        removeOption: (state, action) => {
            const { questionId, optionId } = action.payload;
            const question = state.questions.find(q => q.id === questionId);
            if (question) {
                question.options = question.options.filter(o => o.id !== optionId);
            }
        }
    }
});

export const { addQuestion, addOption, removeQuestion, removeOption } = questionsSlice.actions;
export default questionsSlice.reducer;
