import { Question, ParData } from "../../interface/questionsType";

export interface Variant {
    id: string;
    index: number;
  }
  
  export interface CurrentData {
    questions: Question[];
    currentPage: number;
    answeredVariants?: Variant[];
    isLoading?: boolean;
    error?: string | null;
    visibleQuestions: Question[];
    resultsAnswers?: boolean;
    startId?: string;
    shuffledAnswers?: { [questionId: string]: ParData[] };
  }

  export interface TestsData {
    currentTestInProgress: boolean;
    testsData: {
      [key: string]: CurrentData;
    };
  }