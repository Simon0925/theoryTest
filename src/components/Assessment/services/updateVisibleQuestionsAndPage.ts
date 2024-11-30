import { updateCurrentPage, updatevisibleQuestions } from "../../../store/currentData/currentData.slice";
import { AppDispatch } from "../../../store/store";

export const updateVisibleQuestionsAndPage = (
    reviewMode: 'all' | 'unanswered' | 'flagged',
    unansweredQuestions: any[],
    questions: any[],
    currentAll: number,
    dispatch: AppDispatch,
    typeOftest: string
  ) => {
    let visibleQuestions;
    if (reviewMode === 'unanswered') {
      visibleQuestions = unansweredQuestions.length > 0 ? unansweredQuestions : questions;
    } else if (reviewMode === 'flagged') {
      visibleQuestions = questions.filter((q) => q.flag);
    } else {
      visibleQuestions = questions;
    }
  
    dispatch(updatevisibleQuestions({ testId: typeOftest, visibleQuestions }));
    dispatch(updateCurrentPage({ testId: typeOftest, currentPage: reviewMode === 'all' ? currentAll : 0 }));
  };
  