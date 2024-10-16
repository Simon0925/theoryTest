
export interface Question {
    id: string;
}


interface Result {
    question: string;
    status: boolean | string;
    id: string;
}



export interface PracticeData {
    question: Question[];         
    type: string;                  
    numberOfQuestions: string;     
    correct: boolean;              
    quantity: number;              
    results: Result[];             
    currentQuestions: Questions[]; 
    flagged:boolean;
    allDataLength:number


}


interface ParData {
    answer: string;
    photo: boolean | string;
    tOF: boolean; 
}

export interface Questions {
    _id: string;
    group: string;
    photo: boolean | string;
    question: string;
    par: ParData[]; 
}
