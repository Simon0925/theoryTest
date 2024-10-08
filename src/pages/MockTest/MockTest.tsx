import { useEffect, useState } from 'react';
import FooterMockTest from '../../components/FooterMockTest/FooterMockTest';
import MockTestChart from '../../components/MockTestChart/MockTestChart';
import styles from './MockTest.module.scss';
import Assessment from '../../components/Assessment/Assessment';
import DataStatisticsAssessment from '../../components/DataStatisticsAssessment/DataStatisticsAssessment';
import Results from '../Results/Results';

export default function MockTest() {
    
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [result, setResult] = useState(false); 

    if(!result) localStorage.setItem("result", JSON.stringify([]));

    useEffect(() => {
        if (result) {
            setIsTestStarted(false);
        }
      }, [result]);

    const handleTestClose = () => {
        setIsTestStarted(false); 
    };

    const data = [
        { date: "6 Oct 2024", time: "22m 52s", percentage: 88 },
        { date: "6 Oct 2024", time: "22m 52s", percentage: 50 },
        { date: "6 Oct 2024", time: "22m 52s", percentage: 90 },
        { date: "6 Oct 2024", time: "22m 52s", percentage: 40 },
        { date: "6 Oct 2024", time: "22m 52s", percentage: 30 },
        { date: "6 Oct 2024", time: "22m 52s", percentage: 88 },
        { date: "6 Oct 2024", time: "22m 52s", percentage: 75 }
    ];

    return (
            <>
            {result ? (
                <Results exitResult={setResult} />
            ) : (
                <div className={styles.mockTestContainer}>
                    {!isTestStarted && <MockTestChart data={data} />}
                    {isTestStarted && <Assessment result={setResult} onClose={handleTestClose} />}
                    {!isTestStarted && <DataStatisticsAssessment data={data} />}
                    {!isTestStarted && <FooterMockTest onTestStart={() => setIsTestStarted(true)} />}
                 </div>
            )}
        </>
    );
}
