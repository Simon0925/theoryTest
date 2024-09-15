import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
    id: string;
}


interface Result {
    question: string;
    status: boolean | string;
    id: string;
}



export interface PracticeData {
    question: Question[];         
    type: string;                  
    numberOfQuestions: string;     
    correct: boolean;              
    quantity: number;              
    results: Result[];             
    currentQuestions: Questions[]; 
    flagged:boolean

}

const initialState: PracticeData = {
    question: [],
    type: "All",
    numberOfQuestions: "All",
    correct: false,
    quantity: 0,
    results: [],
    currentQuestions:[],
    flagged: false
};

interface ParData {
    answer: string;
    photo: boolean | string;
    tOF: boolean; 
}

interface Questions {
    _id: string;
    group: string;
    photo: boolean | string;
    question: string;
    par: ParData[]; 
}


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
    },
});


export const { 
    updateNumberOfQuestions, 
    updateType, 
    updateCorrect, 
    updateQuantity, 
    updateQuestion, 
    updatecurrentQuestions,
    updateFlagged
} = practiceSlice.actions;


export default practiceSlice.reducer;
