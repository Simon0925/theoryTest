import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useIsAnswerSelected = (typeOftest:string) => {
    const { questions, currentPage, answeredVariants } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
      );
  return useMemo(
    () => answeredVariants.some((e) => questions[currentPage]?.id === e.id),
    [answeredVariants, currentPage, questions]
  );
};
