import styles from "./QuestionContent.module.scss";
import { RootState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { updateResult } from '../../store/currentData/currentData.slice';
import { QuestionContentProps } from './interface';
import ImageComponent from "../ImageComponent/ImageComponent";
import hostname from "../../config/hostname";

export default function QuestionContent({ typeOftest, question }: QuestionContentProps) {
    const dispatch = useDispatch();
    const color = useSelector((state: RootState) => state.color.themeData);
    const {results } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
    );
    

    const checkResults = useMemo(
        () => results.some(e => e.id === question.id),
        [results, question]
    );

   
    useEffect(() => {
        if (question && !checkResults) {
            const newResult = {
                id: question.id,
                question: question.question,
                flag: question.flag ?? false,
                topic: question.topic,
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
                            {question.photo && 
                            <ImageComponent
                            src={`${hostname}/${question.photo}`}
                            alt={"Related to the question"} 
                            wrapWidth={"300px"}
                            wrapHeight={"250px"}                                />
                            }
                    </div>
                </>
            )}
        </div>
    );    
}
