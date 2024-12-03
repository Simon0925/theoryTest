import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, ParData } from "../../interface/questionsType";
import {  Variant, TestsData} from './interface';


const initialState: TestsData = {
  currentTestInProgress:false,
  testsData: {
    PracticeTest: {
      questions: [],
      currentPage: 0,
      isLoading: false,
      error: null,
      visibleQuestions:[]
    },
    MockTest: {
      questions: [],
      currentPage: 0,
      isLoading: false,
      error: null,
      visibleQuestions:[]
    },
    Trainer: {
      questions: [],
      currentPage: 0,
      isLoading: false,
      error: null,
      visibleQuestions:[]
    },
    Result: {
      resultsAnswers:false,
      startId:'',
      questions: [],
      currentPage: 0,
      answeredVariants: [],
      shuffledAnswers: {},
      visibleQuestions:[]
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
        state.testsData[testId].isLoading = false;
        state.testsData[testId].error = null;
        state.testsData[testId].visibleQuestions = [];
       
      }
    },
    resetStateAll: (state) => {
      const typeOftests = ['PracticeTest', 'MockTest', 'Trainer',"Result"];
      for (const elem of typeOftests) {
        state.testsData[elem] = {
          questions: [],
          currentPage: 0,
          answeredVariants: [],
          isLoading: false,
          error: null,
          visibleQuestions: [],
          resultsAnswers:false,
          startId:''
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
    setShuffledAnswers: (
      state,
      action: PayloadAction<{ testId: string; questionId: string; shuffledAnswers: ParData[] }>
    ) => {
      const { testId, questionId, shuffledAnswers } = action.payload;
    
      if (state.testsData[testId]) {
        if (!state.testsData[testId].shuffledAnswers) {
          state.testsData[testId].shuffledAnswers = {};
        }
        (state.testsData[testId].shuffledAnswers as any)[questionId] = shuffledAnswers;
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
  resetStateAll,
  setTestInactive,
  isActive,
  addStartId,
  setShuffledAnswers
} = questionsSlice.actions;

export default questionsSlice.reducer;