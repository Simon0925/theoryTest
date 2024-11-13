import { useEffect, useState, useMemo } from 'react';
import Toggle from '../../UI/Toggle/Toggle';
import styles from './TestOptions.module.scss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchQuestions, updateCorrect } from '../../store/practice/practice.slice';
import PracticeTools from '../PracticeTools/PracticeTools';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';




export default function TestOptions() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    color,
    practice,
  } = useSelector((state: RootState) => ({
    color: state.color,
    practice: state.practice,
  }), shallowEqual);

  const [isChecked, setIsChecked] = useState(practice.correct);

  useEffect(() => {
    dispatch(fetchQuestions({ testId: 'PracticeTest' }));
  }, [practice.question, practice.allQuestionLength, practice.flagged, practice.numberOfQuestions, practice.type, dispatch]);

  useEffect(() => {
    dispatch(updateCorrect(isChecked));
  }, [isChecked, dispatch]);

 

  const titleStyle = useMemo(() => ({ color: color.titleColorSettings }), [color]);
  const correctAnswerStyle = useMemo(
    () => ({
      background: color.DataStatisticsAssessmentBackground,
      color: color.DataStatisticsAssessmentContent,
    }),
    [color]
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.correct} style={correctAnswerStyle}>
          <span>Show correct answer instantly</span>
          <Toggle toggle={setIsChecked} />
        </div>
        <div className={styles.title}>
          <span style={titleStyle}>
            When this is OFF, you won't see correct answers until the test ends
          </span>
        </div>
      <div className={styles.container}>
        <div className={styles.options}>
          <PracticeTools />
          <NumberOfQuestions />
        </div>
      </div>
    </div>
  );
}
