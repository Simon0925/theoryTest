import { Question, FlagChange } from "../Assessment";

export const changeFlag = (onFlagChange: FlagChange, visibleQuestions: Question[]) => {

  const updatedVisibleQuestions = visibleQuestions.map(q => {
    if (onFlagChange.id === q._id) {
      return { ...q, flag: onFlagChange.newFlag };
    }
    return q;
  });

  return updatedVisibleQuestions; 
};
