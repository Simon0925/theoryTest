import { useEffect, useState, useCallback, useMemo } from 'react';
import Toggle from '../../UI/Toggle/Toggle';
import styles from './TestOptions.module.scss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchQuestions, updateCorrect } from '../../store/practice/practice.slice';
import PracticeTools from '../PracticeTools/PracticeTools';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';
import { updateVisible } from '../../store/burgerMenu/burgerMenu.slice';

interface PracticeSettingsProps {
  practiceTest: (e: boolean) => void;
}

export default function TestOptions({ practiceTest }: PracticeSettingsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    color,
    practice,
    questions,
    isLoading,
  } = useSelector((state: RootState) => ({
    color: state.color,
    practice: state.practice,
    questions: state.currentData.testsData["PracticeTest"]?.questions || [],
    isLoading: state.currentData.testsData["PracticeTest"]?.isLoading || false,
  }), shallowEqual);

  const [isChecked, setIsChecked] = useState(practice.correct);

  useEffect(() => {
    dispatch(fetchQuestions({ testId: 'PracticeTest' }));
  }, [practice.question, practice.allQuestionLength, practice.flagged, practice.numberOfQuestions, practice.type, dispatch]);

  useEffect(() => {
    dispatch(updateCorrect(isChecked));
  }, [isChecked, dispatch]);

  const start = useCallback(() => {
    if (questions.length > 0) {
      practiceTest(true);
      dispatch(updateVisible(true));
    }
  }, [questions.length, dispatch, practiceTest]);

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

      <div className={styles.options}>
        <PracticeTools />
        <NumberOfQuestions />
      </div>

      <div className={!isLoading && questions.length > 0 ? styles.btn : styles.btnIsLoading}>
        <button onClick={start} disabled={isLoading || questions.length === 0}>
          {isLoading ? 'Loading...' : 'Start'}
        </button>
      </div>
    </div>
  );
}
