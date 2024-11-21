import { AppDispatch } from '../../../store/store';
import { resetPracticeState, resetPracticeStateThunk } from '../../../store/practice/practice.slice';
import { resetState, setTestInactive } from '../../../store/currentData/currentData.slice';

export const handleExit = (
  typeOftest: string,
  dispatch: AppDispatch,
  onExitClick: (exit: boolean) => void
) => {
  switch (typeOftest) {
    case "PracticeTest":
      dispatch(resetPracticeState());
      dispatch(resetPracticeStateThunk());
      dispatch(resetState({ testId: typeOftest }));
      dispatch(setTestInactive(false));
      onExitClick(true);
      break;

    case "MockTest":
      dispatch(resetState({ testId: typeOftest }));
      dispatch(setTestInactive(false));
      onExitClick(true);
      break;

    case "Trainer":
      dispatch(resetState({ testId: typeOftest }));
      dispatch(setTestInactive(false));
      onExitClick(true);
      break;

    default:
      console.error(`Test ID "${typeOftest}" does not exist in state.`);
  }
};
