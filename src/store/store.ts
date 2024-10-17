import { configureStore } from '@reduxjs/toolkit';
import practiceReducer from './practice/practice.slice'; 
import assessmentReducer from './assessment.slice'; 
import colorReducer from "./coolor/coolor.slise"

const store = configureStore({
    reducer: {
        practice: practiceReducer,
        assessment: assessmentReducer,
        color:colorReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
