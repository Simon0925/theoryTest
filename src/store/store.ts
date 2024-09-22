import { configureStore } from '@reduxjs/toolkit';
import practiceReducer from './practice.slice'; 
import assessmentReducer from './assessment.slice'; 

const store = configureStore({
    reducer: {
        practice: practiceReducer,
        assessment: assessmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
