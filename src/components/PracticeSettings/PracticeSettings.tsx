import { useCallback, useEffect, useState } from 'react';
import Toggle from '../../UI/Toggle/Toggle';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';
import PracticeTools from '../PracticeTools/PracticeTools';
import styles from './PracticeSettings.module.scss';
import service from '../../service/service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updatecurrentQuestions, updateAllDataLength } from '../../store/practice/practice.slice';

import { setCurrentQuestions } from '../../store/currentData/currentData.slice';



import idUser from "../../config/idUser";

interface PracticeSettingsProps {
    practiceTest: (e: boolean) => void;
}

export default function PracticeSettings({ practiceTest }: PracticeSettingsProps) {
    const dispatch = useDispatch();

    const storeQuestion = useSelector((state: RootState) => state.practice.question);
    const testQuestion = useSelector((state: RootState) => state.practice.currentQuestions);
    const flagged = useSelector((state: RootState) => state.practice.flagged);

    const [quantityOfQuestions, setQuantityOfQuestions] = useState("all");
    const [QuestionType, setQuestionType] = useState("all");
    const [loading, setLoading] = useState(false); 
    const [prevParams, setPrevParams] = useState({ flagged, storeQuestion, QuestionType, quantityOfQuestions });

    const start = () => {
        if (testQuestion.length > 0) practiceTest(true);
    };

    const updateData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await service.questionFilter({
                type: QuestionType,
                questions: storeQuestion,
                userId: idUser,
                quantity: quantityOfQuestions,
                flagged: flagged,
            });
            dispatch(updatecurrentQuestions(data.data)); // don`t forget remove
            dispatch(updateAllDataLength(data.allDataLength));
            dispatch(setCurrentQuestions({ testId: "PracticeTest", questions: data.data })); // new setCurrentQuestions
        } catch (error) {
            console.error("Error fetching questions in useEffect:", error);
        } finally {
            setLoading(false);
        }
    }, [QuestionType, storeQuestion, quantityOfQuestions, flagged, dispatch, idUser]);
    

    useEffect(() => {
        const parametersChanged =
            prevParams.flagged !== flagged ||
            prevParams.storeQuestion !== storeQuestion ||
            prevParams.QuestionType !== QuestionType ||
            prevParams.quantityOfQuestions !== quantityOfQuestions;
        if (parametersChanged && !loading) {
            updateData();
            setPrevParams({ flagged, storeQuestion, QuestionType, quantityOfQuestions });
        }
    }, [storeQuestion, QuestionType, quantityOfQuestions, flagged, prevParams, loading]);

    return (
        <div className={styles['wrap']}>
            <div className={styles['toggle-container']}>
                <span>Show correct answer instantly</span>
                <Toggle />
            </div>
            <PracticeTools change={setQuestionType} />
            <NumberOfQuestions change={setQuantityOfQuestions} />
            <div className={styles['btn']}>
                <button onClick={start} disabled={loading}>Start</button>
            </div>
        </div>
    );
}
