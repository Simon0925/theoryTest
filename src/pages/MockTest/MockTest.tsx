import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './MockTest.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import GoToLogin from '../../components/GoToLogin/GoToLogin';
import { formatTime } from './service/formatTime';
import { mockTestStatistics } from './service/mockTestStatistics';
import { statisticsData } from './interface';
import useCookie from '../../hooks/useCookie';

const Results = lazy(() => import('../../components/Results/Results'));
const Assessment = lazy(() => import('../../components/Assessment/Assessment'));
const FooterMockTest = lazy(() => import('../../components/FooterMockTest/FooterMockTest'));
const MockTestChart = lazy(() => import('../../UI/MockTestChart/MockTestChart'));
const DataStatisticsAssessment = lazy(() => import('../../components/DataStatisticsAssessment/DataStatisticsAssessment'));

export default function MockTest() {
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [result, setResult] = useState(false);
  const [time, setTime] = useState<number | undefined>();
  const [curentTimeFormat, setCurentTimeFormat] = useState('');
  const [data, setData] = useState<statisticsData[] | null>(null);

  const auth = useSelector((state: RootState) => state.auth);
  const accessToken = useCookie('accessToken');
  

  const { results } = useSelector(
    (state: RootState) => state.currentData.testsData["MockTest"],  
    shallowEqual
  );

  const fetchStatistics = useCallback(async (accessToken:string) => {
    try {
      const statistics = await mockTestStatistics(accessToken);
      if (statistics) setData(statistics);
    } catch (error) {
      console.error("Error fetching mock test statistics:", error);
    }
  }, []);

  useEffect(() => {
    if(accessToken){
      fetchStatistics(accessToken);
    }
  }, [results,accessToken]);

  useEffect(() => {
    if (result) {
      setIsTestStarted(false);
    }
  }, [result]);

  useEffect(() => {
    if (typeof time === 'number' && result) {
      const currentTime = 57 * 60 - time; 
      setCurentTimeFormat(formatTime(currentTime));
    }
  }, [time, result]);

  const handleTestClose = () => {
    setIsTestStarted(false);
  };

  if (!auth.isLogin && !auth.loading) return <GoToLogin />;
  if (auth.loading || !auth.isLogin) return <div className={styles.spinner}><Spinner /></div>;

  return (
    <Suspense fallback={
      <div className={styles.spinner}>
        <Spinner  />
      </div>
    }>
      {result ? (
        <Results
          time={curentTimeFormat}
          typeOftest="MockTest"
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
       null
      )}
    </Suspense>
  );
}
