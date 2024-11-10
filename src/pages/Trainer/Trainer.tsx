import { lazy, useCallback, useEffect, useMemo, useState, Suspense } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styles from './Trainer.module.scss';
import { getDataStatistics } from './servise/getDataStatistics';
import OnceTwiceProgress from '../../UI/OnceTwiceProgress/OnceTwiceProgress';
import Spinner from '../../UI/Spinner/Spinner';
import GoToLogin from '../../components/GoToLogin/GoToLogin';
import useUserId from '../../hooks/useUserId';
import { RootState } from '../../store/store';

const TrainerTest = lazy(() => import('../../components/TrainerTest/TrainerTest'));
const Results = lazy(() => import('../../components/Results/Results'));

export default function Trainer() {
    const dispatch = useDispatch();
    const userId = useUserId();

    const [isTestStarted, setIsTestStarted] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [trainerProgress, setTrainerProgress] = useState<{ once: number | null, twice: number | null }>({ once: null, twice: null });

    const { questions, isLoading } = useSelector(
        (state: RootState) => state.currentData.testsData["Trainer"],  
        shallowEqual
    );
    const auth = useSelector((state: RootState) => state.auth);
    const color = useSelector((state: RootState) => state.color);

    const fetchTrainerData = useCallback(() => {
        if (userId && questions.length === 0) {
            getDataStatistics(dispatch, setTrainerProgress, userId);
        }
    }, [userId, questions.length, dispatch]);

    useEffect(() => {
        fetchTrainerData();
    }, [fetchTrainerData]);

    const handleStartToggle = () => setIsTestStarted((prev) => !prev);
    const handleExitResult = (show: boolean) => {
        setShowResults(show);
        setIsTestStarted(!show);
    };

    const descriptionContent = useMemo(() => (
        <div style={{ color: color.VariantTitleColor }} className={styles.description}>
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
    ), [color.VariantTitleColor]);

    if (!auth.isLogin && !auth.loading) return <GoToLogin />;
    if (isLoading) {
        return (
            <div className={styles.spinner}>
                <Spinner color="white" />
            </div>
        );
    }

    return (
        <Suspense fallback={<Spinner color="white" />}>
            {!isTestStarted && !showResults && (
                <TrainerTest result={setShowResults} onExitClick={setIsTestStarted} />
            )}
            {showResults && <Results exitResult={handleExitResult} typeOftest={'Trainer'} />}
            {isTestStarted && !showResults && (
                <div className={styles.wrap}>
                    <OnceTwiceProgress once={trainerProgress.once} twice={trainerProgress.twice} />
                    {descriptionContent}
                    <div onClick={handleStartToggle} className={styles.btn}>
                        <button>Start</button>
                    </div>
                </div>
            )}
        </Suspense>
    );
}
