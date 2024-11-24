import { useMemo } from 'react';
import styles from './QuestionCounterHeader.module.scss';
import getName  from './services/getName';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface QuestionCounterHeaderProps {
  typeOftest: string;
}

const QuestionCounterHeader = ({
  typeOftest,
}:QuestionCounterHeaderProps) => { 
    const color = useSelector((state: RootState) => state.color.themeData);
    const { questions, currentPage, visibleQuestions } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
      );

   

  return useMemo(() => {
    if (typeOftest === 'Trainer' ) {
      return <div className={styles.groupName}>{getName(questions[currentPage].topic)}</div>;
    }

    

    return (
      <div style={{ color: color.HeaderPracticeTestQuestionColors }} className={styles.countQuestions}>
        <span className={styles.questions}>Question</span>
        <span className={styles.questionsM}>Q</span>
        <span>{currentPage + 1}</span>
        <span>of</span>
        <span>{typeOftest === 'MockTest' ? visibleQuestions?.length : questions.length}</span>
      </div>
    );
  }, [
    color.HeaderPracticeTestQuestionColors,
    currentPage,
    questions.length,
    visibleQuestions?.length,
  ]);
};

export default QuestionCounterHeader;
