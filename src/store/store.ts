import { configureStore } from '@reduxjs/toolkit';
import practiceReducer from './practice/practice.slice'; 

import questionsReducer from './currentData/currentData.slice'; 
import hptReducer from './hpt/hpt.slice';
import burgerMenuReducer from './burgerMenu/burgerMenu.slice';
import authReducer from './auth/auth.slice'

import colorReducer from './color/color.slise';

const store = configureStore({
    reducer: {
        practice: practiceReducer,
        color: colorReducer,
        currentData: questionsReducer,
        hptData: hptReducer,
        menu:burgerMenuReducer,
        auth:authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
