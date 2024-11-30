import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateCurrentPage } from '../../store/currentData/currentData.slice';
import { RootState } from '../../store/store';
import {Question} from '../../interface/questionsType'

interface UsePageNavigationProps {
  typeOftest: string;
  totalQuestions:Question[];
}

export function usePageNavigation({ typeOftest ,totalQuestions}: UsePageNavigationProps) {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const { currentPage } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );
//TODO remove totalQuestions

  const navigatePage = useCallback(
    (direction: string) => {
      if (direction === 'previous' && currentPage > 0) {
        dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage - 1 }));
      } else if (direction === 'next') {
        const isLastPage = currentPage === totalQuestions.length - 1 ;
        if (isLastPage) {
          setModalVisible(true);
        } else {
          dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage + 1 }));
        }
      }
    },
    [currentPage, dispatch, totalQuestions, typeOftest]
  );

  return {
    navigatePage,
    isModalVisible,
    setModalVisible,
  };
}
