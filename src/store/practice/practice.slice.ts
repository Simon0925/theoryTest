import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PracticeData,Topic} from './interface';
import service from './sevice/questionFilter';
import { setCurrentQuestions,setLoading } from '../currentData/currentData.slice';
import {updateResult} from '../currentData/currentData.slice'




const initialState: PracticeData = {
    topic: [],
    type: 'all',
    numberOfQuestions: 'all',
    correct: false,
    flagged: false,
    allQuestionLength: 0,
};

export const fetchQuestions = createAsyncThunk<
  void, 
  { testId: string; token: string }, 
  { rejectValue: string }
>(
  'practice/fetchQuestions',
  async ({ testId,token }, { getState, rejectWithValue, dispatch }) => {
    
    const state: any = getState();
  
    const practice = state.practice;
 
    dispatch(setLoading({ testId, isLoading: true }));

    try {
      const data = await service.questionFilter({
        type: practice.type,
        topics: practice.topic,
        token: token,
        quantity: practice.numberOfQuestions,
        flagged: practice.flagged,
      });
            
      dispatch(updateTopicLength(data.allDataLength));
      dispatch(setCurrentQuestions({
        testId, 
        questions: data.data, 
      }));
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      return rejectWithValue('Failed to fetch questions');
    } finally {
      dispatch(setLoading({
        testId, 
        isLoading: false
      }));
    }
  }
);


export const resetPracticeStateThunk = createAsyncThunk<void, void, { dispatch: any }>(
  'practice/resetPracticeStateThunk',
  async (_, { dispatch }) => {
    
    dispatch(resetPracticeState()); 
    dispatch(updateResult({ testId: "PracticeTest", result: [] }));  
  }
);

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
        updateFlagged: (state, action: PayloadAction<boolean>) => {
            state.flagged = action.payload;
        },
        updateTopicLength: (state, action: PayloadAction<number>) => {
            state.allQuestionLength = action.payload;
        }, updateTopic: (state, action: PayloadAction<Topic[]>) => {
            state.topic = action.payload;
        },resetPracticeState: (state) => {
          state.flagged = false;
          state.topic = [];
          state.allQuestionLength = 0;
          state.correct = false;
      }
    }
});

export const { 
    updateNumberOfQuestions, 
    updateType, 
    updateCorrect, 
    updateFlagged,
    updateTopicLength,
    updateTopic,
    resetPracticeState,
} = practiceSlice.actions;

export default practiceSlice.reducer;
export type { PracticeData }; 