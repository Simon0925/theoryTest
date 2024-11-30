
import {Question} from "../../interface/questionsType"


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



interface Result {
    flag:boolean;
    topic:string;
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


