import { useEffect, useState } from "react";
import { QuestionResult } from "./interface/interface";
import { mockTestData } from "./service/mockTestData";

export function useMockTestData(typeOftest: string, questions: any[], results: QuestionResult[]) {
  const [data, setData] = useState<QuestionResult[]>([]);

  useEffect(() => {
    if (typeOftest === "MockTest" && questions.length > 0) {
      if (data.length === 0) {
        const mockTestResults = mockTestData(questions, results);
        setData(mockTestResults);
      }
    } else if (results.length > 0) {
      setData(results);
    }
  }, [questions, results, typeOftest]);

  return data;
}
