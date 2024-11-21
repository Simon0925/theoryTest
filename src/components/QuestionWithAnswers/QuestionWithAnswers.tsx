import QuestionContent from "../QuestionContent/QuestionContent";
import VariantsOfAnswers from "../VariantsOfAnswers/VariantsOfAnswers";
import styles from "./QuestionWithAnswers.module.scss";
import {QuestionWithAnswersProps} from './interface';


const QuestionWithAnswers: React.FC<QuestionWithAnswersProps> = ({
    typeOftest,
    question
}) => {
  return (
    <div className={styles.questionWrapper}>
        <QuestionContent 
            typeOftest={typeOftest}
            question={question}/>
    
        <VariantsOfAnswers 
            typeOftest={typeOftest}
            question={question} 
        />
    </div>
  );
};

export default QuestionWithAnswers;
