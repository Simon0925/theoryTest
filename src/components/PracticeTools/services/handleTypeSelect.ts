import { AppDispatch } from '../../../store/store';
import { updateType } from '../../../store/practice/practice.slice';

export const handleTypeSelect = (
  type: string,
  dispatch: AppDispatch,
  setActive: React.Dispatch<React.SetStateAction<{
    all: boolean;
    noSeen: boolean;
    wrong: boolean;
  }>>
) => {
  const newState = {
    all: false,
    noSeen: false,
    wrong: false,
  };

  switch (type) {
    case 'all':
      dispatch(updateType('all'));
      setActive({ ...newState, all: true });
      break;
    case 'noSeen':
      dispatch(updateType('noSeen'));
      setActive({ ...newState, noSeen: true });
      break;
    case 'wrong':
      dispatch(updateType('wrong'));
      setActive({ ...newState, wrong: true });
      break;
    default:
      console.error(`Invalid type: ${type}`);
  }
};
