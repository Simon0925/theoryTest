import styles from "./VariantsOfAnswers.module.scss";
import { useEffect, useState } from 'react';
import Variant from '../../components/Variant/Variant';
import { shuffleArray } from './service/shuffleArray';
import { VariantsOfAnswersProps } from "./interface";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function VariantsOfAnswers({
    typeOftest,
    question
}: VariantsOfAnswersProps) {

    const [shuffledAnswers, setShuffledAnswers] = useState<{ [key: string]: any[] }>({});

    const themeData = useSelector((state: RootState) => state.color.themeData);

    useEffect(() => {
        if (question && !shuffledAnswers[question.id]) {
            setShuffledAnswers((prev) => ({
                ...prev,
                [question.id]: shuffleArray(question.par),
            }));
        }
    }, [question, shuffledAnswers]);

    const answersToShow = question ? shuffledAnswers[question.id] || [] : [];

    return (
        <div 
            className={styles.wrap}
            style={{backgroundColor:themeData.TestBackground}}
        >
            <span 
            className={styles.title}
            style={{color:themeData.VariantTitleColor}}
            >
                Choose 1 answer
            </span>
            <div className={styles.variants}>
                {answersToShow.map((answer, index) => (
                    <Variant
                        key={index}
                        index={index}
                        answer={answer.answer}
                        correct={answer.tOF}
                        photo={answer.photo}
                        typeOftest={typeOftest}
                    />
                ))}
            </div>
        </div>
    );
}
