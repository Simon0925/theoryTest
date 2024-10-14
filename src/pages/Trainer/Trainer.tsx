import { useEffect, useState } from 'react';
import styles from './Trainer.module.scss'

import {getDataStatistics} from './servise/getDataStatistics';
import OnceTwiceProgress from '../../UI/OnceTwiceProgress/OnceTwiceProgress';
import TrainerTest from '../../components/TrainerTest/TrainerTest';
import {Question} from "./interface"
import Results from '../Results/Results';



export default function Trainer () {
    const [trainerData, setTrainerData] = useState<Question[]>([]);
    const [isTestStarted, setIsTestStarted] = useState(true);
    const [result, setResult] = useState(false);

    let [trainerOnceTwice,setTrainerOnceTwice] = useState({
        once: null,
        twice: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDataStatistics();
                setTrainerData(data.trainerQuestions);
                setTrainerOnceTwice(prev => ({
                    ...prev, 
                    once: data.correctAnswersOnce,  
                    twice: data.correctAnswersTwice  
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(); 
    }, []);

    const start = () => {
        setIsTestStarted(!isTestStarted);
    };

    const exitResult = (e:boolean) =>{
        setResult(e)
        setIsTestStarted(!isTestStarted)
    }

    return (
        <>
            {isTestStarted && !result && 
            <div className={styles.wrap}>
                <OnceTwiceProgress once={trainerOnceTwice.once} twice={trainerOnceTwice.twice} />
                <div className={styles.description}>
                <p>
                    Personal Trainer uses an algorithm that learns about you as you progress.
                    It first shows you the questions you need to learn the most.
                    You can answer as many questions as you wish each time - it will remember the questions you've yet to see or have answered incorrectly.
                </p>
            
                <p>
                    In the dynamic chart above, you'll see your progress as you answer questions correctly once, and then twice.
                    It includes your answers from 'Practice Mode' and the 'Mock Test'. We find this is the best way to coach you for the test
                </p>
                </div>
                <div onClick={start} className={styles.btn}>
                    <button>Start</button>
                </div>
            </div>
            }
            {!isTestStarted && !result &&  <TrainerTest result={setResult} onExitClick={setIsTestStarted} data={trainerData} />}
            {result && <Results exitResult={exitResult} />}
        </>
    );
}
