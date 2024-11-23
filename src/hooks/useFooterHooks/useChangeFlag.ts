import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuestions, updateResult } from '../../store/currentData/currentData.slice';
import { updateQuestionsAndResults } from '../../services/serviceFooter/updateQuestionsAndResults';
import { RootState } from '../../store/store';

export function useChangeFlag(typeOftest: string) {
  const dispatch = useDispatch();

  const { questions, currentPage, results } = useSelector((state: RootState) => state.currentData.testsData[typeOftest]);

  const changeFlag = useCallback(() => {
    if (!questions[currentPage]) return;

    const { updatedQuestions, updatedResults } = updateQuestionsAndResults(
      questions,
      results,
      currentPage
    );

    dispatch(setCurrentQuestions({ testId: typeOftest, questions: updatedQuestions }));
    dispatch(updateResult({ testId: typeOftest, result: updatedResults }));
  }, [currentPage, questions, results, dispatch, typeOftest]);

  return { changeFlag };
}
