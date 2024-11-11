import QuestionContent from "../QuestionContent/QuestionContent";
import VariantsOfAnswers from "../VariantsOfAnswers/VariantsOfAnswers";
import styles from "./QuestionWithAnswers.module.scss";

interface QuestionWithAnswersProps {
    typeOftest:string;
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
