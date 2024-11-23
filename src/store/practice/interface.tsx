
export interface Topic {
    id: string;
}



export interface PracticeData {
    topic: Topic[];         
    type: string;                  
    numberOfQuestions: string;     
    correct: boolean;                          
    flagged:boolean;
    allQuestionLength:number;
}




  
 