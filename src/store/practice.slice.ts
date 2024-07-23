import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
    id: string;
}
interface Result {
    question: string;
    status: boolean | string;
    id:string
}

export interface PracticeData {
    question: Question[];
    type: string;
    numberOfQuestions: string;
    correct: boolean;
    quantity: number;
    results: Result[];
}

const initialState: PracticeData = {
    question: [],
    type: "All",
    numberOfQuestions: "All",
    correct: false,
    quantity: 0,
    results:[],
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
        updateResults: (state, action: PayloadAction<Result[]>) => {
            state.results = action.payload;
        }
    },
});

export const { updateNumberOfQuestions,updateType,updateCorrect,updateQuantity, updateQuestion,updateResults } = practiceSlice.actions;
export default practiceSlice.reducer;





