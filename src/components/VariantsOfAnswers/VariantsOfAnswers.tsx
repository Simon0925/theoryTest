import styles from "./VariantsOfAnswers.module.scss";
import { useEffect} from 'react';
import Variant from '../../components/Variant/Variant';
import { shuffleArray } from './services/shuffleArray';
import { VariantsOfAnswersProps } from "./interface";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setShuffledAnswers } from "../../store/currentData/currentData.slice";

export default function VariantsOfAnswers({
    typeOftest,
    question
}: VariantsOfAnswersProps) {

    const dispatch = useDispatch()


    const shuffledAnswers = useSelector(
        (state: RootState) => state.currentData.testsData["Result"].shuffledAnswers
      );

    const themeData = useSelector((state: RootState) => state.color.themeData);

    useEffect(() => {
        if (question && (!shuffledAnswers || !shuffledAnswers[question.id])) {
          const shuffled = shuffleArray(question.par);
          dispatch(
            setShuffledAnswers({
              testId: "Result",
              questionId: question.id,
              shuffledAnswers: shuffled,
            })
          );
        }
      }, [question, shuffledAnswers, dispatch]);

      const answersToShow =
      question && shuffledAnswers && shuffledAnswers[question.id]
        ? shuffledAnswers[question.id]
        : [];

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
