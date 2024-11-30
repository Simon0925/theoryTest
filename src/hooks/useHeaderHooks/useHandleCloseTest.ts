import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store'; 
import { resetStateAll, setTestInactive } from '../../store/currentData/currentData.slice';
import { resetPracticeState, resetPracticeStateThunk } from '../../store/practice/practice.slice';

export const useHandleCloseTest = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleModalClose = useCallback(
    (typeOfTest: string, exitResult: (exit: boolean) => void) => {
      switch (typeOfTest) {
        case "PracticeTest":
          dispatch(resetStateAll());
          dispatch(resetPracticeState());
          dispatch(resetPracticeStateThunk()); 
          dispatch(setTestInactive(false));
          break;

        case "MockTest":
          dispatch(resetStateAll());
          dispatch(setTestInactive(false));
          break;

        case "Trainer":
          dispatch(resetStateAll());
          dispatch(setTestInactive(false));
          break;

        default:
          console.error(`Test ID "${typeOfTest}" does not exist in state.`);
      }
      exitResult(false);
    },
    [dispatch]
  );

  return handleModalClose;
};
