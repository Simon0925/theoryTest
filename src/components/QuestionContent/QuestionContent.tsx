import styles from "./QuestionContent.module.scss";
import { RootState } from '../../store/store';
import hostname from "../../config/hostname";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState, useMemo } from "react";
import { updateResult } from '../../store/currentData/currentData.slice';
import { QuestionContentProps } from './interface';
import Loader from "../../UI/Loader/Loader";

export default function QuestionContent({ typeOftest, question }: QuestionContentProps) {
    const dispatch = useDispatch();
    const color = useSelector((state: RootState) => state.color.themeData);
    const {results } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
    );

    const [loaded, setLoaded] = useState(false); 
    const imageRef = useRef<HTMLImageElement | null>(null);

    const checkResults = useMemo(
        () => results.some(e => e.id === question.id),
        [results, question]
    );


    useEffect(() => {
        if (imageRef.current && question) {
            setLoaded(false); 
            imageRef.current.onload = () => setLoaded(true);
            imageRef.current.onerror = () => setLoaded(true); 
        }
    }, [question]);

    useEffect(() => {
        if (question && !checkResults) {
            const newResult = {
                id: question.id,
                question: question.question,
                flag: question.flag ?? false,
                group: question.group,
                status: "pass",
                photo: question.photo,
            };
            dispatch(updateResult({
                testId: typeOftest,
                result: [...results, newResult]
            }));
        }
    }, [checkResults, question, dispatch, typeOftest, results]);

    return (
        <div 
            className={styles['question-wrap']}
            style={{backgroundColor: color?.QuestionContentBackground || "transparent"}}
        >   
            {question && (
                <>
                    <div className={question.flag ? styles['marker'] : styles['inactive-marker']}></div>
                    <div className={styles["container"]}>
                        <span
                            style={{backgroundColor: color?.QuestionContentBackground || "transparent"}}
                            className={styles['question']}
                        >
                            <p style={{color: color?.TestcolorText || "#000"}}>{question.question}</p>
                        </span>
                        <div className={styles['question-photo']}>
                            {!loaded && question.photo && <div className={styles.loader}><Loader /></div>}
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
                </>
            )}
        </div>
    );    
}
