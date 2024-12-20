import { useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import HeaderForTest from "../HeaderForTest/HeaderForTest";
import TrainerFooter from "../TrainerFooter/TrainerFooter";
import styles from "./TrainerTest.module.scss";
import { getData } from "./services/getData";
import { RootState } from "../../store/store";
import QuestionWithAnswers from "../QuestionWithAnswers/QuestionWithAnswers";
import { setTestInactive } from "../../store/currentData/currentData.slice";
import useCookie from "../../hooks/useCookie";

interface TrainerTestProps {
    onExitClick: (exit: boolean) => void;
    result: (showResult: boolean) => void;
}

export default function TrainerTest({ onExitClick, result }: TrainerTestProps) {
    const dispatch = useDispatch();
    const accessToken = useCookie('accessToken');

    const { questions, currentPage, isLoading } = useSelector(
        (state: RootState) => state.currentData.testsData["Trainer"],  
        shallowEqual
    );

    const fetchTrainerQuestions = useCallback((accessToken:string) => {
        getData(dispatch, accessToken);
    }, [dispatch]);

    useEffect(() => {
        if(accessToken && questions.length <= 0){
        fetchTrainerQuestions(accessToken);
        }
    }, [accessToken,fetchTrainerQuestions]);

    useEffect(()=>{
        if(questions.length > 0){
          dispatch(setTestInactive(true))
        }
    },[questions,dispatch])

    const renderContent = () => (
        <div className={styles.wrap}>
                <HeaderForTest 
                    finish="Results"
                    onExitClick={onExitClick}
                    result={result}
                    typeOftest="Trainer"
                />
               <QuestionWithAnswers
                    typeOftest="Trainer" 
                    question={questions[currentPage]}  
                />
                <TrainerFooter
                    typeOftest="Trainer" 
                    result={result}
                />
        </div>
    );

    return (
        <>
            {!isLoading && questions.length > 0 ? renderContent() : null}
        </>
    );
}
