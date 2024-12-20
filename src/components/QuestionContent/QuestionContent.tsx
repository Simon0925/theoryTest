import styles from "./QuestionContent.module.scss";
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { updateResult } from '../../store/currentData/currentData.slice';
import { QuestionContentProps } from './interface';
import ImageComponent from "../ImageComponent/ImageComponent";
import hostname from "../../config/hostname";
import { selectResultQuestions } from "../../store/currentData/selectors";


export default function QuestionContent({  question }: QuestionContentProps) {

    const dispatch = useDispatch();

    const color = useSelector((state: RootState) => state.color.themeData);

    const resultQuestions = useSelector(selectResultQuestions);

    const checkResults = useMemo(
        () => resultQuestions.some(e => e.id === question.id),
        [resultQuestions, question.id]
    );

   
    useEffect(() => {
        if (question && !checkResults) {
            const newResult = {
                id: question.id || '',
                question: question.question || "",
                flag: question.flag ?? false,
                topic: question.topic,
                status: "pass",
                photo: question.photo,
                par:question.par,
                explanation:question.explanation || '',
                correctAnswers:question.correctAnswers || 0,
                incorrectAnswers:question.incorrectAnswers || 0
            };
            dispatch(updateResult({
                questions: [...resultQuestions, newResult]
            }));
        }
    }, [checkResults, question, dispatch, resultQuestions]);

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
                            wrapHeight={"250px"}                           
                             />
                            }
                    </div>
                </>
            )}
        </div>
    );    
}
