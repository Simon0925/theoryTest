export interface Answer {
    answer: string;
    tOF: boolean;
    photo: boolean | string;
}

export interface Question {
    correctAnswers: number;
    explanation: string;
    flag: boolean | undefined;
    group: string;
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
export interface Result {
    id: string;
    question: string;
    status: boolean | string;
    group: string;
    flag: boolean;
}

interface ParData {
    answer: string;
    tOF: boolean;
    photo: string | boolean;
}

 export interface VariantsOfAnswersProps {
    question:Question;
    typeOftest: string; 

}