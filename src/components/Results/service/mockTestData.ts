import { QuestionResult, Question } from '../interface/interface';

export const mockTestData = (questions: Question[], results: QuestionResult[]): QuestionResult[] => {
    const data: QuestionResult[] = [];

    questions.forEach((q) => {

        const existingResult = results.find((r) => q.id.toString() === r.id);

        if (existingResult) {
            data.push(existingResult);
        } else {
            const newResult: QuestionResult = {
                flag: q.flag,
                topic: q.topic,
                id: q.id.toString(),
                question: q.question,
                status: "pass", 
            };
            data.push(newResult);
        }
    });

    return data; 
};
