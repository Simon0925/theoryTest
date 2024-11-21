import { AppDispatch } from '../../../store/store';
import { updateNumberOfQuestions } from '../../../store/practice/practice.slice';

export const handleSelect = (
  type: string,
  dispatch: AppDispatch,
  setActive: React.Dispatch<React.SetStateAction<{
    ten: boolean;
    twenty: boolean;
    thirty: boolean;
    all: boolean;
  }>>
) => {
  const newState = {
    ten: false,
    twenty: false,
    thirty: false,
    all: false,
  };

  switch (type) {
    case 'all':
      dispatch(updateNumberOfQuestions('all'));
      setActive({ ...newState, all: true });
      break;
    case 'ten':
      dispatch(updateNumberOfQuestions('ten'));
      setActive({ ...newState, ten: true });
      break;
    case 'twenty':
      dispatch(updateNumberOfQuestions('twenty'));
      setActive({ ...newState, twenty: true });
      break;
    case 'thirty':
      dispatch(updateNumberOfQuestions('thirty'));
      setActive({ ...newState, thirty: true });
      break;
    default:
      console.error(`Invalid type: ${type}`);
  }
};
