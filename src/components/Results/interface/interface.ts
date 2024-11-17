
export interface QuestionResult {
    id: string;
    question: string;
    status: boolean | string;
    group: string;
    flag:boolean
}

export interface statisticData {
    time:string | undefined;
    date:string | undefined;
    percentage:number | undefined;
}


export interface Question {
    id: string;
    question: string;
    group: string;
    flag: boolean;
    status: boolean | string;
    photo?: string | boolean;
}

export interface QuestionResult {
  id: string;
  question: string;
  status: boolean | string;
  group: string;
  flag:boolean
  photo?: string | boolean;
}

export interface statisticData {
  time:string | undefined;
  date:string | undefined;
  percentage:number | undefined;
}