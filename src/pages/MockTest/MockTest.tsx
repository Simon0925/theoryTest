import { useEffect, useState } from 'react';
import FooterMockTest from '../../components/FooterMockTest/FooterMockTest';
import MockTestChart from '../../components/MockTestChart/MockTestChart';
import styles from './MockTest.module.scss';
import Assessment from '../../components/Assessment/Assessment';
import DataStatisticsAssessment from '../../components/DataStatisticsAssessment/DataStatisticsAssessment';
import Results from '../Results/Results';
import { formatTime } from './service/formatTime';
import { mockTestStatistics } from './service/mockTestStatistics';
import Spinner from '../../UI/Spinner/Spinner';

import {Question,statisticsData} from "./interface"


export default function MockTest() {
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [result, setResult] = useState(false);
  const [time, setTime] = useState<number | undefined>();
  const [curentTimeFormat, setCurentTimeFormat] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [data, setData] = useState<statisticsData[] | null>(null);

  if (!result && !isTestStarted) localStorage.setItem('result', JSON.stringify([]));

  useEffect(() => {
    if (result) {
      setIsTestStarted(false);
    }
  }, [result]);

  const handleTestClose = () => {
    setIsTestStarted(false);
  };

  useEffect(() => {
    if (typeof time === 'number' && result) {
      const curentTime = 57 * 60 - time;
      const curentFormatTime = formatTime(curentTime);
      setCurentTimeFormat(curentFormatTime);
    }
  }, [time, result]);

  useEffect(() => {
    const fetchStatistics = async () => {
      const statistics = await mockTestStatistics();
      if (statistics) {
        setData(statistics);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <>
      {result ? (
        <Results
          question={questions}
          time={curentTimeFormat}
          mockTest={true}
          exitResult={setResult}
        />
      ) : data ? (
        <div className={styles.mockTestContainer}>
          {!isTestStarted && <MockTestChart data={data} />}
          {isTestStarted && (
            <Assessment
              getQuestion={setQuestions}
              getTime={setTime}
              result={setResult}
              onClose={handleTestClose}
            />
          )}
          {!isTestStarted && <DataStatisticsAssessment data={data} />}
          {!isTestStarted && (
            <FooterMockTest onTestStart={() => setIsTestStarted(true)} />
          )}
        </div>
      ) : (
        <div className={styles.spiner}>
            <Spinner color={'black'} />
        </div>
      )}
    </>
  );
}
