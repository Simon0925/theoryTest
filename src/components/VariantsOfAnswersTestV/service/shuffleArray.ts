import { Answer } from "../VariantsOfAnswersTestV"


export function shuffleArray(array: Answer[]): Answer[] {
    return array
        .map(item => ({ ...item })) 
        .sort(() => Math.random() - 0.5); 
}