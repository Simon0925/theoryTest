import { Question } from './types.ts'; 

export const updateQuestionsAndResults = (
  questions: Question[], 
  results: Question[], 
  currentPage: number,
  typeOftest?: string,
  visibleQuestions: Question[] = []
): { updatedQuestions: Question[], updatedResults: Question[] } => {

  const targetQuestions = typeOftest === "MockTest" ? visibleQuestions : questions;

  const updatedQuestions = questions.map((element) => {
    if (element.id === targetQuestions[currentPage].id) {
      return { ...element, flag: !element.flag };
    }
    return element;
  });

  const existingResult = results.find((e: Question) => questions[currentPage].id === e.id);

  const updatedResults = existingResult
    ? results.map((result: Question) =>
        result.id === questions[currentPage].id
          ? { ...result, flag: !result.flag }
          : result
      )
    : [
        ...results,
        {
          id: questions[currentPage].id,
          question: questions[currentPage].question,
          flag: !questions[currentPage].flag,
          topic: questions[currentPage].topic,
          status: questions[currentPage].status,
          correctAnswers: questions[currentPage].correctAnswers,
          explanation: questions[currentPage].explanation,
          incorrectAnswers: questions[currentPage].incorrectAnswers,
          par: questions[currentPage].par,
          photo: questions[currentPage].photo,
        },
      ];

  return { updatedQuestions, updatedResults };
};
