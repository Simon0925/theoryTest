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

    const [time,setTime] = useState<number | undefined>();

    if(!result && !isTestStarted)localStorage.setItem("result", JSON.stringify([]));

    useEffect(() => {
        if (result) {
            setIsTestStarted(false);
        }
      }, [result]);

    const handleTestClose = () => {
        setIsTestStarted(false); 
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        let result = '';
        if (minutes > 0) {
            result += `${minutes}m`;
        }
        if (seconds > 0) {
            if (result.length > 0) {
                result += ' ';
            }
            result += `${seconds}s`;
        }
        if (result === '') {
            result = '0s';
        }
    
        return result;
    };

    useEffect(()=>{
        if(typeof time === "number" && result){
            const curentTime = (57 * 60) - time
            const curentFormatTime = formatTime(curentTime)
            console.log("curentTime:",curentFormatTime)
        }
    },[time,result])

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
                    {isTestStarted && <Assessment getTime={setTime} result={setResult} onClose={handleTestClose} />}
                    {!isTestStarted && <DataStatisticsAssessment data={data} />}
                    {!isTestStarted && <FooterMockTest onTestStart={() => setIsTestStarted(true)} />}
                 </div>
            )}
        </>
    );
}
