import { Question } from "../interface";

interface AnsweredQuestion {
  id: string;
  index: number;
}

export const getUnansweredQuestions = (answeredVariants:AnsweredQuestion[],questions: Question[]): Question[] => {
  
  if (answeredVariants.length > 0) {
    const unanswered: Question[] = questions.filter(

      (q) => !answeredVariants.some((element) => q.id === element.id)
    );
    return unanswered;
  }
  return [];
};
