import { useEffect, useState, useMemo, useCallback } from 'react';
import FooterMockTest from '../../components/FooterMockTest/FooterMockTest';
import MockTestChart from '../../components/MockTestChart/MockTestChart';
import styles from './MockTest.module.scss';
import Assessment from '../../components/Assessment/Assessment';
import DataStatisticsAssessment from '../../components/DataStatisticsAssessment/DataStatisticsAssessment';
import Results from '../../components/Results/Results';
import { formatTime } from './service/formatTime';
import { mockTestStatistics } from './service/mockTestStatistics';

import { statisticsData } from './interface';
import { shallowEqual, useSelector } from 'react-redux';


import { RootState } from '../../store/store';
import Spinner from '../../UI/Spinner/Spinner';





export default function MockTest() {
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [result, setResult] = useState(false);
  const [time, setTime] = useState<number | undefined>();
  const [curentTimeFormat, setCurentTimeFormat] = useState('');
  const [data, setData] = useState<statisticsData[] | null>(null);
  

  
  const { results} = useSelector(
    (state: RootState) => state.currentData.testsData["MockTest"],  
    shallowEqual
);

  const fetchStatistics = useMemo(
    () => async () => {
      const statistics = await mockTestStatistics();
      if (statistics) setData(statistics);
    }, []
  );
  


  useEffect(() => {
    if (result) {
      setIsTestStarted(false);
    }
  }, [result]);

  useEffect(() => {
    if (!data && results.length <= 0) {
      fetchStatistics();
    }
  }, [data,results]);


  useEffect(() => {
    if (typeof time === 'number' && result) {
      const curentTime = 57 * 60 - time;
      setCurentTimeFormat(formatTime(curentTime));
    }
  }, [time, result]);

  

  const handleTestClose = () => {
    setIsTestStarted(false);
  };


   

  return (
    <>
      {result ? (
        <Results
          time={curentTimeFormat}
          typeOftest={'MockTest'}
          exitResult={setResult}
        />
      ) : data ? (
        <div className={styles.mockTestContainer}>
          {!isTestStarted && (
            <div className={styles.statistics}>
              <MockTestChart data={data} />
              <DataStatisticsAssessment data={data} />
            </div>
          )}
          {isTestStarted && (
            <Assessment
              getTime={setTime}
              result={setResult}
              onClose={handleTestClose}
            />
          )}
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
