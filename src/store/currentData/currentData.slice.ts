import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  correctAnswers: number;
  explanation: string;
  flag: boolean ;
  group: string;
  id: string;
  incorrectAnswers: number;
  par: ParData[];
  photo: boolean | string;
  question: string;
  status: boolean | string;
}



interface Variant {
  id: string;
  index: number;
}

interface Result {
    id: string;  
    question: string;
    group: string;
    flag: boolean;
    status: boolean | string;
    photo?: string | boolean;
}

interface CurrentData {
  questions: Question[] ;
  currentPage: number;
  answeredVariants: Variant[];
  results: Result[];
  isLoading: boolean;
  error: string | null;
  visibleQuestions?:Question[]
}

interface ParData {
  answer: string;
  photo: boolean | string;
  tOF: boolean;
}

interface TestsData {
  testsData: {
    [key: string]: CurrentData;
  };
}

const initialState: TestsData = {
  testsData: {
    PracticeTest: {
      questions: [],
      currentPage: 0,
      answeredVariants: [],
      results: [],
      isLoading: false,
      error: null,
      visibleQuestions:[]
    },
    MockTest: {
      questions: [],
      currentPage: 0,
      answeredVariants: [],
      results: [],
      isLoading: false,
      error: null,
      visibleQuestions:[]
    },
    Trainer: {
      questions: [],
      currentPage: 0,
      answeredVariants: [],
      results: [],
      isLoading: false,
      error: null,
      visibleQuestions:[]
    },
  },
};

export type { TestsData };

export const questionsSlice = createSlice({
  name: 'currentData',
  initialState,
  reducers: {
    setCurrentQuestions: (
      state,
      action: PayloadAction<{ testId: string; questions: Question[] }>
    ) => {
      const { testId, questions } = action.payload;
      state.testsData[testId].questions = questions;
    },
    updateCurrentPage: (
      state,
      action: PayloadAction<{ testId: string; currentPage: number }>
    ) => {
      const { testId, currentPage } = action.payload;
      state.testsData[testId].currentPage = currentPage;
    },
    updateAnsweredVariants: (
      state,
      action: PayloadAction<{ testId: string; answeredVariants: Variant[] }>
    ) => {
      const { testId, answeredVariants } = action.payload;
      state.testsData[testId].answeredVariants = answeredVariants;
    },
    updateResult: (
      state,
      action: PayloadAction<{ testId: string; result: Result[] }>
    ) => {
      const { testId, result } = action.payload;
      state.testsData[testId].results = result;
    },
    updatevisibleQuestions: (
      state,
      action: PayloadAction<{ testId: string; visibleQuestions: Question[] }>
    ) => {
      const { testId, visibleQuestions } = action.payload;
      state.testsData[testId].visibleQuestions = visibleQuestions;
    },
    resetState: (
      state,
      action: PayloadAction<{ testId: string }>
    ) => {
      const { testId } = action.payload;
      if (state.testsData[testId]) {
        state.testsData[testId].questions = [];
        state.testsData[testId].currentPage = 0;
        state.testsData[testId].answeredVariants = [];
        state.testsData[testId].results = [];
        state.testsData[testId].visibleQuestions = [];
      }
    },
    resetStateAll: (state) => {
      const typeOftests = ['PracticeTest', 'MockTest', 'Trainer'];
      for (const elem of typeOftests) {
        state.testsData[elem] = {
          questions: [],
          currentPage: 0,
          answeredVariants: [],
          results: [],
          isLoading: false,
          error: null,
          visibleQuestions: [],
        };
      }
    },
    setLoading: (
      state,
      action: PayloadAction<{ testId: string; isLoading: boolean }>
    ) => {
      const { testId, isLoading } = action.payload;
      state.testsData[testId].isLoading = isLoading; 
    },
    setError: (
      state,
      action: PayloadAction<{ testId: string; error: string | null }>
    ) => {
      const { testId, error } = action.payload;
      state.testsData[testId].error = error; 
    },
  },
});

export const {
  setCurrentQuestions,
  updateCurrentPage,
  updateAnsweredVariants,
  updateResult,
  setLoading,
  setError,
  updatevisibleQuestions,
  resetState,
  resetStateAll
} = questionsSlice.actions;

export default questionsSlice.reducer;
