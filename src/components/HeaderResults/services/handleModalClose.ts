import { AppDispatch } from '../../../store/store';
import { resetPracticeState, resetPracticeStateThunk } from '../../../store/practice/practice.slice';
import { resetState, setTestInactive } from '../../../store/currentData/currentData.slice';

export const handleModalClose = (
  typeOftest: string,
  dispatch: AppDispatch,
  exitResult: (exit: boolean) => void
) => {
  switch (typeOftest) {
    case "PracticeTest":
      dispatch(resetState({ testId: typeOftest }));
      dispatch(resetPracticeState());
      dispatch(resetPracticeStateThunk());
      dispatch(setTestInactive(false));
      break;

    case "MockTest":
      dispatch(resetState({ testId: typeOftest }));
      dispatch(setTestInactive(false));
      break;
    case "Trainer":
      dispatch(resetState({ testId: typeOftest }));
      dispatch(setTestInactive(false));
      break;

    default:
      console.error(`Test ID "${typeOftest}" does not exist in state.`);
  }
  exitResult(false);
};
