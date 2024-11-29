import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useIsAnswerSelected = (typeOftest:string) => {
    const { questions, currentPage,visibleQuestions } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
      );
      const answeredVariants = useSelector( (state: RootState) => state.currentData.testsData["Result"].answeredVariants)

      if(typeOftest === "MockTest"){
        if(visibleQuestions)
        return useMemo(
          () => answeredVariants?.some((e) => visibleQuestions[currentPage].id === e.id),
          [answeredVariants, currentPage,visibleQuestions]
        );
      }else{
        return useMemo(
          () => answeredVariants?.some((e) => questions[currentPage]?.id === e.id),
          [answeredVariants, currentPage, questions]
        );
      }
  
};
