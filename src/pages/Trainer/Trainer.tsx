import { useCallback, useEffect, useState } from 'react';
import styles from './Trainer.module.scss';
import { getDataStatistics } from './servise/getDataStatistics';
import OnceTwiceProgress from '../../UI/OnceTwiceProgress/OnceTwiceProgress';
import TrainerTest from '../../components/TrainerTest/TrainerTest';
import Results from '../../components/Results/Results';
import Spinner from '../../UI/Spinner/Spinner';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Trainer() {
    const dispatch = useDispatch();
  
    const [isTestStarted, setIsTestStarted] = useState(true);
    const [result, setResult] = useState(false);

  
    const [trainerOnceTwice, setTrainerOnceTwice] = useState<{ once: number | null, twice: number | null }>({
        once: null,
        twice: null
    });

    const color = useSelector((state: RootState) => state.color);

    const { questions, isLoading } = useSelector(
        (state: RootState) => state.currentData.testsData["Trainer"],  
        shallowEqual
    );

    const fetchTrainerData = useCallback(() => {
        if (questions.length <= 0) {
            getDataStatistics(dispatch, setTrainerOnceTwice); 
        }
    }, [questions.length, dispatch, setTrainerOnceTwice]);

    useEffect(() => {
        fetchTrainerData();
    }, [fetchTrainerData]);

    const start = () => {
        setIsTestStarted(!isTestStarted);
    };

    const exitResult = (e: boolean) => {
        setResult(e);
        setIsTestStarted(!isTestStarted);
    };

    return (
        <>
            {!isLoading ? (
                <>
                    {isTestStarted && !result && (
                        <div className={styles.wrap}>
                            <OnceTwiceProgress once={trainerOnceTwice.once} twice={trainerOnceTwice.twice} />
                            <div style={{color:color.VariantTitleColor}} className={styles.description}>
                                <p>
                                    Personal Trainer uses an algorithm that learns about you as you progress. It first shows
                                    you the questions you need to learn the most. You can answer as many questions as you
                                    wish each time - it will remember the questions you've yet to see or have answered
                                    incorrectly.
                                </p>
                                <p>
                                    In the dynamic chart above, you'll see your progress as you answer questions correctly
                                    once, and then twice. It includes your answers from 'Practice Mode' and the 'Mock Test'.
                                    We find this is the best way to coach you for the test.
                                </p>
                            </div>
                            <div onClick={start} className={styles.btn}>
                                <button>Start</button>
                            </div>
                        </div>
                    )}
                    {!isTestStarted && !result && (
                        <TrainerTest result={setResult} onExitClick={setIsTestStarted} />
                    )}
                    {result && <Results exitResult={exitResult} typeOftest={'Trainer'} />}
                </>
            ) : (
                <div className={styles.spiner}>
                    <Spinner color={'white'} />
                </div>
            )}
        </>
    );
}
