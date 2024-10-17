import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {PracticeData,Question,Questions} from "./interface"

const initialState: PracticeData = {
    question: [],
    type: "All",
    numberOfQuestions: "All",
    correct: false,
    quantity: 0,
    results: [],
    currentQuestions:[],
    flagged: false,
    allDataLength:0
};


export const practiceSlice = createSlice({
    name: 'practice',
    initialState,
    reducers: {
        updateCorrect: (state, action: PayloadAction<boolean>) => {
            state.correct = action.payload;
        },
        updateType: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        },
        updateNumberOfQuestions: (state, action: PayloadAction<string>) => {
            state.numberOfQuestions = action.payload;
        },
        updateQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload;
        },
        updateQuestion: (state, action: PayloadAction<Question[]>) => {
            state.question = action.payload;
        },
        updatecurrentQuestions: (state, action: PayloadAction<Questions[]>) => {
            state.currentQuestions = action.payload;  
        },
        updateFlagged: (state, action: PayloadAction<boolean>) => {
            state.flagged = action.payload;
        },
        updateAllDataLength: (state, action: PayloadAction<number>) => {
            state.allDataLength = action.payload;
        }
    },
});


export const { 
    updateNumberOfQuestions, 
    updateType, 
    updateCorrect, 
    updateQuantity, 
    updateQuestion, 
    updatecurrentQuestions,
    updateFlagged,
    updateAllDataLength
} = practiceSlice.actions;


export default practiceSlice.reducer;
