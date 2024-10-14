export interface Answer {
    answer: string;
    tOF: boolean;
    photo: boolean | string;
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

 export interface VariantsOfAnswersrops {
    id: string;
    question: string;
    group: string;
    par: ParData[];
    click: (e: string) => void;
    currentFlag: boolean | undefined;
    typeOftest: string; 
    nextPage: ((e: number) => void) | null;
    currentPage: number | null;
    setQuestionsSelected?: (selected: { id: string, index: number }[]) => void; 
}