import { useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import HeaderForTest from "../HeaderForTest/HeaderForTest";
import FooterTrainerTest from "../FooterTrainerTest/FooterTrainerTest";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./TrainerTest.module.scss";
import useUserId from "../../hooks/useUserId";
import { getData } from "./service/getData";
import { RootState } from "../../store/store";
import QuestionWithAnswers from "../QuestionWithAnswers/QuestionWithAnswers";

interface TrainerTestProps {
    onExitClick: (exit: boolean) => void;
    result: (showResult: boolean) => void;
}

export default function TrainerTest({ onExitClick, result }: TrainerTestProps) {
    const dispatch = useDispatch();
    const userId = useUserId();

    const { questions, currentPage, isLoading } = useSelector(
        (state: RootState) => state.currentData.testsData["Trainer"],  
        shallowEqual
    );

    const fetchTrainerQuestions = useCallback(() => {
        if (userId && questions.length === 0) {
            getData(dispatch, userId);
        }
    }, [userId, questions.length, dispatch]);

    useEffect(() => {
        fetchTrainerQuestions();
    }, [fetchTrainerQuestions]);

    const renderContent = () => (
        <div className={styles.wrap}>
                <HeaderForTest 
                    finish="Results"
                    onExitClick={onExitClick}
                    trainerTest
                    result={result}
                    typeOftest="Trainer"
                />
               <QuestionWithAnswers
                typeOftest="Trainer" 
                question={questions[currentPage]}  
                />
                <FooterTrainerTest result={result} />
        </div>
    );

    return (
        <>
            {!isLoading && questions.length > 0 ? renderContent() : (
                <div className={styles.spinner}>
                    <Spinner color="white" />
                </div>
            )}
        </>
    );
}
