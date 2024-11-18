import { useEffect, useState} from 'react';
import Toggle from '../../UI/Toggle/Toggle';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';
import PracticeTools from '../PracticeTools/PracticeTools';
import styles from './PracticeSettings.module.scss';
import {  shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchQuestions, updateCorrect } from '../../store/practice/practice.slice';

interface PracticeSettingsProps {
    practiceTest: (e: boolean) => void;
}
import { AppDispatch } from '../../store/store'; 
import DotTyping from '../../UI/DotTyping/DotTyping';
import useCookie from '../../hooks/useCookie';



export default function PracticeSettings({ practiceTest }: PracticeSettingsProps) {
    const { questions } = useSelector(
        (state: RootState) => state.currentData.testsData["PracticeTest"],  
        shallowEqual
    );


    const dispatch: AppDispatch = useDispatch();

    const accessToken = useCookie('accessToken');

    const color = useSelector((state: RootState) => state.color);

    const practice = useSelector((state: RootState) => state.practice);

    const isLoading = useSelector((state: RootState) => state.currentData.testsData["PracticeTest"].isLoading);

    const [isChecked, setIsChecked] = useState(practice.correct);

    useEffect(()=>{
        dispatch(updateCorrect(isChecked));
    },[isChecked])


    const start = () => {
        if (questions.length > 0) practiceTest(true);
    };
 
    useEffect(() => {
        if(accessToken){
            dispatch(fetchQuestions({ testId: 'PracticeTest',token:accessToken }));
        }
    }, [practice.question,practice.allQuestionLength,practice.flagged,practice.numberOfQuestions,practice.type,accessToken]);

    return (
        <div  className={styles['wrap']}>
            <div style={{color:color.titleColorSettings}} className={styles['toggle-container']}>
                <span>Show correct answer instantly</span>
                <Toggle toggle={setIsChecked}/>
            </div>
            <PracticeTools  />
            <NumberOfQuestions  />
            <div
            className={
                !isLoading && questions.length > 0
                ? styles['btn']
                : styles['btnIsLoading']
            }
                >
                <button className={styles.startBtn} onClick={start}>
                    {isLoading ? (
                    <>
                        Loadin <DotTyping />
                    </>
                    ) : (
                        <>
                        Start
                        </>
                    
                    )}
                </button>
            </div>
        </div>
    );
}
