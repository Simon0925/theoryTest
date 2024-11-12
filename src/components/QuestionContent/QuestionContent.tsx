import styles from "./QuestionContent.module.scss";
import { RootState } from '../../store/store';
import hostname from "../../config/hostname";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateResult } from '../../store/currentData/currentData.slice';

interface QuestionContentProps {    
    typeOftest: string;
    question: Question ; 
}

interface Question {
    correctAnswers: number;
    explanation: string;
    flag: boolean | undefined;
    group: string;
    id: string;
    incorrectAnswers: number;
    par: ParData[];
    photo: boolean | string;
    question: string;
    status: boolean | string;
}

interface ParData {
    answer: string;
    photo: boolean | string;
    tOF: boolean;
}

export default function QuestionContent({ typeOftest, question }: QuestionContentProps) {

    const dispatch = useDispatch();

    const color = useSelector((state: RootState) => state.color);


    const { currentPage, results } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],  
        shallowEqual
    );


    useEffect(() => {
        if (question) {
            const checkResults = results.some(e => e.id === question.id);
            if (!checkResults) {
                const newResult = {
                    id: question.id,
                    question: question.question,
                    flag: question.flag ?? false,
                    group: question.group,
                    status: "pass",
                    photo:question.photo
                };
                dispatch(updateResult({
                    testId: typeOftest,
                    result: [...results, newResult] 
                }));
            }
        }
    }, [currentPage, question]); 

    if (!question) {
        return <div className={styles['spiner']}>Loading question...</div>;
    }

    return (
        <div 
            className={styles['question-wrap']}
            style={{backgroundColor:color.QuestionContentBackground}}
        >
            <div className={question.flag ?? false ? styles['marker'] : styles['inactive-marker']}></div>

            <div className={styles["container"]}>
                <span
                style={{backgroundColor:color.QuestionContentBackground}}
                className={styles['question']}>
                    <p style={{color:color.TestcolorText}}>{question.question}</p>
                </span>
                <div className={styles['question-photo']} >
                    {question.photo && (
                        <img
                            className={styles['img']}
                            src={`${hostname}${question.photo}`}
                            alt="Related to the question" 
                            loading="lazy" 
                        />
                    )}
                </div>
            </div>
            
        </div>
    );
}