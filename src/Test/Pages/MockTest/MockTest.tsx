import { useEffect, useState, useMemo, useCallback } from 'react';
import FooterMockTest from '../../FooterMockTest/FooterMockTest';
import MockTestChart from '../../MockTestChart/MockTestChart';
import styles from './MockTest.module.scss';
import Assessment from '../../Assessment/Assessment';
import DataStatisticsAssessment from '../../DataStatisticsAssessment/DataStatisticsAssessment';
import Results from '../../Results/Results';
import { formatTime } from './service/formatTime';
import { mockTestStatistics } from './service/mockTestStatistics';
import Spinner from '../../../UI/Spinner/Spinner';
import { statisticsData } from './interface';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import {assessmentData} from './service/assessmentData'



export default function MockTest() {
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [result, setResult] = useState(false);
  const [time, setTime] = useState<number | undefined>();
  const [curentTimeFormat, setCurentTimeFormat] = useState('');
  const [data, setData] = useState<statisticsData[] | null>(null);

  const dispatch = useDispatch();

  
  const { results,questions } = useSelector(
    (state: RootState) => state.currentData.testsData["MockTest"],  
    shallowEqual
);

  const fetchStatistics = useMemo(
    () => async () => {
      const statistics = await mockTestStatistics();
      if (statistics) setData(statistics);
    }, []
  );
  
  const fetchAssessmentData = useCallback(() => {
    if (questions.length <= 0) {
      assessmentData(dispatch);
    }
  }, [questions.length]);

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

  useEffect(() => {
    fetchAssessmentData();
  }, []);

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
