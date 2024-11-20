export interface VariantProps {
    answer: string;
    photo: boolean | string;
    index:number
    correct:boolean
    typeOftest:string
}
export interface AnsweredVariant {
    id: string;
    index: number;
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


interface Result {
    flag:boolean;
    group:string;
    id:string;
    photo:string;
    question:string;
    status:boolean
}


export type AnsweredVariantsInterface = AnsweredVariant[];

export type VisibleQuestionsInterface = Question[]

export type ResultInterface = Result []

export type CoolorState = {
    [key: string]: string; 
};


