export interface QuestionWithAnswersProps {
    typeOftest:string;
    question: Question ; 
}
interface Question {
    correctAnswers: number;
    explanation: string;
    flag: boolean | undefined;
    topic: string;
    id: string;
    incorrectAnswers: number;
    par: ParData[];
    photo: boolean | string;
    question: string;
    status: boolean | string;
}

interface ParData {
    answer: string;
    photo: boolean | string;
    tOF: boolean;
}