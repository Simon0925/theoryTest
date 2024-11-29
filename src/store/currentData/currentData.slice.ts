import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  correctAnswers: number;
  explanation: string;
  flag: boolean ;
  topic: string;
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


interface CurrentData {
  questions: Question[] ;
  currentPage: number;
  answeredVariants: Variant[];
  isLoading: boolean;
  error: string | null;
  visibleQuestions?:Question[]
  resultsAnswers?:boolean;
  startId?:string
}

interface ParData {
  answer: string;
  photo: boolean | string;
  tOF: boolean;
}

interface TestsData {
  currentTestInProgress:boolean;
  testsData: {
    [key: string]: CurrentData;
  };
}

const initialState: TestsData = {
  currentTestInProgress:false,
  testsData: {
    PracticeTest: {
      questions: [],
      currentPage: 0,
      answeredVariants: [],
      isLoading: false,
      error: null,
    },
    MockTest: {
      questions: [],
      currentPage: 0,
      answeredVariants: [],
      isLoading: false,
      error: null,
      visibleQuestions:[]
    },
    Trainer: {
      questions: [],
      currentPage: 0,
      answeredVariants: [],
      isLoading: false,
      error: null,
    },
    Result: {
      resultsAnswers:false,
      startId:'',
      questions: [],
      currentPage: 0,
      answeredVariants: [],
      isLoading: false,
      error: null,
    }
  },
};

export type { TestsData };

export const questionsSlice = createSlice({
  name: 'currentData',
  initialState,
  reducers: {
    setTestInactive:(state, action: PayloadAction<boolean>) => {
      state.currentTestInProgress = action.payload;
  },
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
      action: PayloadAction<{questions: Question[] }>
    ) => {
      const {questions } = action.payload;
      state.testsData["Result"].questions = questions;
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
          isLoading: false,
          error: null,
          visibleQuestions: [],
        };
      }
    },
    addStartId: (
      state, 
      action: PayloadAction<{ startId: string; }>
      ) => {
      state.testsData["Result"].startId = action.payload.startId;
    },
    isActive: (
      state,
      action: PayloadAction<{ resultsAnswers: boolean; }>
       ) => {
      state.testsData["Result"].resultsAnswers = action.payload.resultsAnswers;
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
  resetStateAll,
  setTestInactive,
  isActive,
  addStartId
} = questionsSlice.actions;

export default questionsSlice.reducer;
