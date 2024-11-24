export interface QuestionResult {
    id: string;
    question: string;
    status: boolean | string;
    group: string;
    flag:boolean
    photo?: string | boolean;
  }

  export interface Question {
    id: string;
    question: string;
    group: string;
    flag: boolean;
    status: boolean | string;
    photo?: string | boolean;
}

export interface StatisticData {
    time?: string;
    date: string;
    percentage: number;
  }