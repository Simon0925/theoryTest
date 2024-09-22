import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParData {
    answer: string;
    photo: boolean | string;
    tOF: boolean; 
}

export interface Question {
    _id: string;
    group: string;
    photo: boolean | string;
    question: string;
    par: ParData[]; 
    flagged: boolean; 
}

export interface AssessmentState {  
    assessmentQuestions: Question[];
}

const initialState: AssessmentState = {
    assessmentQuestions: [] 
};

export const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {
        clearQuestions: (state) => {
            state.assessmentQuestions = [];
        },
        addQuestion: (state, action: PayloadAction<Question>) => {
            const existingQuestion = state.assessmentQuestions.find(q => q._id === action.payload._id);
            if (!existingQuestion) {
                state.assessmentQuestions.push(action.payload);
            } else {
                Object.assign(existingQuestion, action.payload);
            }
        },
        updateFlagged: (state, action: PayloadAction<{ id: string; flagged: boolean }>) => {
            const { id, flagged } = action.payload;
            const question = state.assessmentQuestions.find(q => q._id === id);
            if (question) {
                question.flagged = flagged; 
            }
        },
    },
});

export const { clearQuestions, addQuestion, updateFlagged } = assessmentSlice.actions;

export default assessmentSlice.reducer;
