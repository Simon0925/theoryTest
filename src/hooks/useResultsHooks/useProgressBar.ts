import { useEffect, useState } from "react";
import { QuestionResult } from "./interface/interface";

export function useProgressBar(data: QuestionResult[]) {
  const [progressBar, setProgressBar] = useState({
    pass: 0,
    falseAnswer: 0,
    trueAnswer: 0,
  });
  const [mockTestTrueAnswer, setMockTestTrueAnswer] = useState<number>();

  useEffect(() => {
    if (data.length > 0) {
      const total = data.length;
      const counts = data.reduce(
        (acc, e) => {
          if (e.status === "pass" || e.status === undefined) acc.pass += 1;
          else if (e.status === false) acc.falseAnswer += 1;
          else if (e.status === true) acc.trueAnswer += 1;
          return acc;
        },
        { pass: 0, falseAnswer: 0, trueAnswer: 0 }
      );

      if (total > 0) {
        setProgressBar({
          pass: Math.floor((counts.pass / total) * 100),
          falseAnswer: Math.floor((counts.falseAnswer / total) * 100),
          trueAnswer: Math.floor((counts.trueAnswer / total) * 100),
        });
        setMockTestTrueAnswer(counts.trueAnswer);
      }
    }
  }, [data]);

  return { progressBar, mockTestTrueAnswer };
}
