
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
    flagged:boolean;
    allQuestionLength:number;
}


interface ParData {
    answer: string;
    photo: boolean | string;
    tOF: boolean; 
}

export interface Questions {
    id: string;
    group: string;
    photo: boolean | string;
    question: string;
    par: ParData[]; 
    flag: boolean; 
}

  
 