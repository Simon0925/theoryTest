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
    photo: boolean | string;
    tOF: boolean;
}
export interface Result {
    flag: boolean;
    topic: string;
    id: string;
    question: string;
    status: string | boolean;
  }