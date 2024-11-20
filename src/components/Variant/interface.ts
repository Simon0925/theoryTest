import { type } from "os";

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
interface Question {
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
export type AnsweredVariantsInterface = AnsweredVariant[];

export type VisibleQuestionsInterface = Question[]