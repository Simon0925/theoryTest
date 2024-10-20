import { useEffect, useState } from 'react';
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
import { useAppDispatch } from '../../../store/assessment/hooks'; 
import { fetchQuestions } from '../../../store/assessment/assessment.slice';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';



export default function MockTest() {

  const [isTestStarted, setIsTestStarted] = useState(false);
  const [result, setResult] = useState(false);
  const [time, setTime] = useState<number | undefined>();
  const [curentTimeFormat, setCurentTimeFormat] = useState('');
  const [data, setData] = useState<statisticsData[] | null>(null);

  const { questions} = useSelector(
    (state: RootState) => state.currentData.testsData["MockTest"],  
    shallowEqual
);

  const dispatch = useAppDispatch(); 

  useEffect(() => {
    if (result) {
      setIsTestStarted(false);
    }
  }, [result]);

  const handleTestClose = () => {
    setIsTestStarted(false);
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      const statistics = await mockTestStatistics();
      if (statistics) {
        setData(statistics);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    if (typeof time === 'number' && result) {
      const curentTime = 57 * 60 - time;
      const curentFormatTime = formatTime(curentTime);
      setCurentTimeFormat(curentFormatTime);
    }
  }, [time, result]);

  useEffect(() => {
    if(questions.length <= 0){
      dispatch(fetchQuestions({ testId: 'MockTest' })); 
    }
  }, [questions]);

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
