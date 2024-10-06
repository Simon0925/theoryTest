import { Question } from "../Assessment";

interface AnsweredQuestion {
  id: string;
  answer: boolean;
}

export const getUnansweredQuestions = (questions: Question[]): Question[] => {
  const localS = localStorage.getItem('result');
  const localStore: AnsweredQuestion[] = localS ? JSON.parse(localS) : [];

  const answeredQuestion = localStore.filter((q) => q.answer === true);

  if (answeredQuestion.length > 0) {
    const unanswered: Question[] = questions.filter(
      (q) => !answeredQuestion.some((element) => q._id === element.id)
    );
    return unanswered;
  }
  return [];
};
