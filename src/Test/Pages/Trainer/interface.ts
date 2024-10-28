export interface ParData {
  answer: string;
  tOF: boolean;
  photo: string | boolean;
}

export interface Question {
  id: string;
  question: string;
  photo: string | boolean;  
  group: string;
  par: ParData[];
  flag: boolean | undefined; 
  explanation: string;
}
