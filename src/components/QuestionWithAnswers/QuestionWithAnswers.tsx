import QuestionContent from "../QuestionContent/QuestionContent";
import VariantsOfAnswers from "../VariantsOfAnswers/VariantsOfAnswers";
import styles from "./QuestionWithAnswers.module.scss";
import {QuestionWithAnswersProps} from './interface';


const QuestionWithAnswers = ({
    typeOftest,
    question
}:QuestionWithAnswersProps) => {
  return (
    <div className={styles.questionWrapper}>
        <QuestionContent 
            question={question}/>
    
        <VariantsOfAnswers 
            typeOftest={typeOftest}
            question={question} 
        />
    </div>
  );
};

export default QuestionWithAnswers;
