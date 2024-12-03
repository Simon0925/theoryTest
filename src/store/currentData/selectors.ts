import { createSelector } from 'reselect';
import { RootState } from '../store';
import { Question, ParData } from "../../interface/questionsType";

const selectTestsData = (state: RootState) => state.currentData.testsData;
const selectResultData = (state: RootState) => state.currentData.testsData["Result"];


export const selectQuestions = (testId: string): ((state: RootState) => Question[]) =>
  createSelector(
    [selectTestsData],
    (testsData) => testsData[testId]?.questions || []
  );


export const selectResultQuestions: (state: RootState) => Question[] =
  createSelector(
    [selectResultData],
    (resultData) => resultData.questions || []
  );


export const selectIsLoading = (testId: string): ((state: RootState) => boolean) =>
  createSelector(
    [selectTestsData],
    (testsData) => testsData[testId]?.isLoading || false
  );


export const selectCurrentPage = (testId: string): ((state: RootState) => number) =>
  createSelector(
    [selectTestsData],
    (testsData) => testsData[testId]?.currentPage || 0
  );


export const selectShuffledAnswers = (testId: string, questionId: string): ((state: RootState) => ParData[]) =>
  createSelector(
    [selectTestsData],
    (testsData) =>
      testsData[testId]?.shuffledAnswers?.[questionId] || []
  );
