import { useEffect, useState } from "react";
import currentDate from "./service/currentDate";
import {StatisticData} from './interface/interface'


export function useStatisticData(mockTestTrueAnswer: number | undefined, typeOftest: string, time?: string) {
  const [statisticData, setStatisticData] = useState<StatisticData | undefined>(undefined);

  useEffect(() => {
    if (mockTestTrueAnswer !== undefined && typeOftest === "MockTest") {
      const date = currentDate();
      const percentage = mockTestTrueAnswer ? (mockTestTrueAnswer * 100) / 50 : 0;
      setStatisticData({ time, date, percentage });
    }
  }, [mockTestTrueAnswer, time, typeOftest]);

  return statisticData;
}
