import styles from "./QuestionContent.module.scss";
import { RootState } from '../../store/store';
import hostname from "../../config/hostname";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { updateResult } from '../../store/currentData/currentData.slice';
import {QuestionContentProps} from './interface'
import Loader from "../../UI/Loader/Loader";

export default function QuestionContent({ typeOftest, question }: QuestionContentProps) {

    const dispatch = useDispatch();

    const color = useSelector((state: RootState) => state.color);

    const [loaded, setLoaded] = useState(false); 

    const imageRef = useRef<HTMLImageElement | null>(null);

    const { currentPage, results } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],  
        shallowEqual
    );
    
    useEffect(() => {
        if (imageRef.current) {
            setLoaded(false); 
            imageRef.current.onload = () => setLoaded(true);
        }
    }, [question.photo]);

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

  
    useEffect(() => {
        setLoaded(false);
    }, [question.id]);


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
                <div className={styles['question-photo']}>
                    {!loaded && question.photo && <div className={styles.loader}> <Loader /> </div>}
                    {question.photo && (
                        <img
                            ref={imageRef}
                            key={question.id}
                            className={`${styles.image}`}
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
