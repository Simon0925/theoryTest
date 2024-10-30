import { configureStore } from '@reduxjs/toolkit';
import practiceReducer from './practice/practice.slice'; 
import colorReducer from './coolor/coolor.slise';
import questionsReducer from './currentData/currentData.slice'; 
import hptReducer from './hpt/hpt.slice';
import burgerMenuReducer from './burgerMenu/burgerMenu.slice';

const store = configureStore({
    reducer: {
        practice: practiceReducer,
        color: colorReducer,
        currentData: questionsReducer,
        hptData: hptReducer,
        menu:burgerMenuReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
