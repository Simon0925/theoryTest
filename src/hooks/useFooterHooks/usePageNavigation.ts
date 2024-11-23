import { useCallback, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateCurrentPage } from '../../store/currentData/currentData.slice';
import { RootState } from '../../store/store';

interface UsePageNavigationProps {
  typeOftest: string;
 }
 export function usePageNavigation({ typeOftest }: UsePageNavigationProps) {
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
  
    const { questions, currentPage } = useSelector(
      (state: RootState) => state.currentData.testsData[typeOftest],
      shallowEqual
    );
  
    const navigatePage = useCallback(
      (direction: string) => {
        if (direction === 'previous' && currentPage > 0) {
          dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage - 1 }));
        } else if (direction === 'next') {
          const isLastPage = currentPage === questions.length - 1;
          if (isLastPage) {
            setModalVisible(true);
          } else {
            dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage + 1 }));
          }
        }
      },
      [currentPage, dispatch, questions.length, typeOftest]
    );
  
    return {
      navigatePage,
      isModalVisible,
      setModalVisible,
    };
  }
  