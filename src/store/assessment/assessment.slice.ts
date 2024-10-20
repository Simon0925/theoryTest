import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { assessmentData } from './service/assessmentData'; 
import { setCurrentQuestions, setLoading } from '../currentData/currentData.slice';

interface ParData {
  answer: string;
  photo: boolean | string;
  tOF: boolean; 
}

export interface Question {
  id: string;
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
export const fetchQuestions = createAsyncThunk<
  void, 
  { testId: string }, 
  { rejectValue: string }
>(
  'assessment/fetchQuestions',
  async ({ testId }, { rejectWithValue, dispatch }) => {
    dispatch(setLoading({ testId, isLoading: true }));
    try {
      const data = await assessmentData(); 
        dispatch(setCurrentQuestions({
          testId, 
          questions: data, 
        }));
        
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to fetch questions');
    } finally {
      dispatch(setLoading({ testId, isLoading: false }));
    }
  }
);


export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.assessmentQuestions.push(action.payload);
    }
  },
});

export const { addQuestion } = assessmentSlice.actions;

export default assessmentSlice.reducer;
