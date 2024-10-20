import { useEffect} from 'react';
import Toggle from '../../UI/Toggle/Toggle';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';
import PracticeTools from '../PracticeTools/PracticeTools';
import styles from './PracticeSettings.module.scss';
import {  shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchQuestions } from '../../store/practice/practice.slice';

interface PracticeSettingsProps {
    practiceTest: (e: boolean) => void;
}
import { AppDispatch } from '../../store/store'; 
import Spinner from '../../UI/Spinner/Spinner';

export default function PracticeSettings({ practiceTest }: PracticeSettingsProps) {
    const { questions } = useSelector(
        (state: RootState) => state.currentData.testsData["PracticeTest"],  
        shallowEqual
    );

    const dispatch: AppDispatch = useDispatch();

    const color = useSelector((state: RootState) => state.color);

    const practice = useSelector((state: RootState) => state.practice);

    const isLoading = useSelector((state: RootState) => state.currentData.testsData["PracticeTest"].isLoading);

    const start = () => {
        if (questions.length > 0) practiceTest(true);
    };
 
    useEffect(() => {
        dispatch(fetchQuestions({ testId: 'PracticeTest' }));
    }, [practice]);

    return (
        <div  className={styles['wrap']}>
            <div style={{color:color.titleColorSettings}} className={styles['toggle-container']}>
                <span>Show correct answer instantly</span>
                <Toggle />
            </div>
            <PracticeTools  />
            <NumberOfQuestions  />
            {!isLoading ?
            <div className={styles['btn']}>
                <button onClick={start} >Start</button> 
            </div>
            :
            <div className={styles['spiner']}>
                <Spinner color={'white'} />
            </div>
            }
        </div>
    );
}
