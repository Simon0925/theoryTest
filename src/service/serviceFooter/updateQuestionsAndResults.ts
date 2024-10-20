import { Question } from './types.ts'; 
import { Result } from './types.ts';  

export const updateQuestionsAndResults = (
  questions: Question[], 
  results: Result[], 
  currentPage: number
): { updatedQuestions: Question[], updatedResults: Result[] } => {
  
  const updatedQuestions = questions.map((element) => {
    if (element.id === questions[currentPage].id) {
      return { ...element, flag: !element.flag };
    }
    return element;
  });

  const existingResult = results.find((e: Result) => questions[currentPage].id === e.id);

  const updatedResults = existingResult
    ? results.map((result: Result) =>
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
          group: questions[currentPage].group,
          status: questions[currentPage].status,
        },
      ];

  return { updatedQuestions, updatedResults };
};
