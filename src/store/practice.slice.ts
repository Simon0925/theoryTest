import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for a single question
interface Question {
    id: string;
}

// Interface for a single result
interface Result {
    question: string;
    status: boolean | string;
    id: string;
}

// Interface for the main practice data state
export interface PracticeData {
    question: Question[];
    type: string;
    numberOfQuestions: string;
    correct: boolean;
    quantity: number;
    results: Result[];
    currentQuestions: Questions[];  // Update this type to match your expected data structure
}

// Initial state for the practice slice
const initialState: PracticeData = {
    question: [],
    type: "All",
    numberOfQuestions: "All",
    correct: false,
    quantity: 0,
    results: [],
    currentQuestions: []  // Updated to match the Questions type
};

// Interface for the par data structure
interface ParData {
    answer: string;
    photo: boolean | string;
    tOF: boolean;
}

// Interface for a question structure in the currentQuestions array
interface Questions {
    _id: string;
    group: string;
    photo: boolean | string;
    question: string;
    par: ParData[];
}

// Creating the practice slice with reducers to manage state
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
            state.currentQuestions = action.payload;  // Correctly update the currentQuestions field
        }
    },
});

// Export actions to be used in components
export const { updateNumberOfQuestions, updateType, updateCorrect, updateQuantity, updateQuestion, updatecurrentQuestions } = practiceSlice.actions;

// Export reducer to be used in the store
export default practiceSlice.reducer;
