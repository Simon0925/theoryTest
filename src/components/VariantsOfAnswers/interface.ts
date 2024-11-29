import {Question} from '../../interface/questionsType'

export interface Answer {
    answer: string;
    tOF: boolean;
    photo: boolean | string;
}


 export interface VariantsOfAnswersProps {
    question:Question;
    typeOftest: string; 

}