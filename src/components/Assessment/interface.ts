export interface AssessmentProps {
    onClose: (e: boolean) => void;
    result: (e: boolean) => void;
    getTime: (e: number | undefined) => void;
  }
  
  export interface Question {
    correctAnswers: number;
    explanation: string;
    flag: boolean ;
    topic: string;
    id: string;
    incorrectAnswers: number;
    par: ParData[];
    photo: boolean | string;
    question: string;
    status: boolean | string;
  }
  
  interface ParData {
    answer: string;
    tOF: boolean;
    photo: string | boolean;
  }