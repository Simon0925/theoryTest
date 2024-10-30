export interface Question {
    id: string;
    question: string;
    photo?: string;
    group: string;
    par: ParData[];
    flag: boolean;
    explanation: string;
  }
  
 export interface ParData {
    answer: string;
    tOF: boolean;
    photo: string | boolean;
  }
  
 export interface statisticsData {
    time: string;
    date: string;
    percentage: number;
  }