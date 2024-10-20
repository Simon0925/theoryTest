export interface Question {
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
export interface Result {
    flag: boolean;
    group: string;
    id: string;
    question: string;
    status: string | boolean;
  }