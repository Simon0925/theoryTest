import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './HeaderForTest.module.scss';
import Modal from '../Modal/Modal';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { resetPracticeState, resetPracticeStateThunk } from '../../store/practice/practice.slice'; 
import { resetState } from '../../store/currentData/currentData.slice';
import getName from "./service/getName"

interface HeaderForTestProps {
  onExitClick: (e: boolean) => void;
  finish: string;
  mockTest?: boolean;
  reviewClick?: (e: boolean) => void;
  result?: (e: boolean) => void;
  trainerTest?: boolean;
  typeOftest: string;  
}

const HeaderForTest = React.memo(function HeaderForTest({
  finish,
  onExitClick,
  reviewClick,
  result,
  trainerTest,
  typeOftest,
}: HeaderForTestProps) {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const color = useSelector((state: RootState) => state.color, shallowEqual);

  
  const { questions, currentPage,visibleQuestions} = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],  
    shallowEqual
);

  const handleModalClose = useCallback(() => setShowExitModal(true), []);
  
  const handleResults = useCallback(() => {
    if (typeOftest === "MockTest" && reviewClick) {
      reviewClick(true);
    } else {
      setShowResultsModal((prev) => !prev);
    }
  }, [typeOftest, reviewClick]);

  const handleExit = useCallback(() => {
    switch (typeOftest) {
      case "PracticeTest":
        dispatch(resetPracticeState());
        dispatch(resetPracticeStateThunk());
        break;
      case "MockTest":
        dispatch(resetState({ testId: typeOftest }));
        break;
        case "Trainer":
        dispatch(resetState({ testId: typeOftest }));
        break;
      default:
        console.error(`Test ID "${typeOftest}" does not exist in state.`);
    }
    onExitClick(true);
  }, [dispatch, onExitClick, typeOftest]);

  const handleModalCancel = useCallback(() => setShowExitModal(false), []);
  const handleResultsModalCancel = useCallback(() => setShowResultsModal((prev) => !prev), []);
  const handleResultsModalClose = useCallback(() => {
    if (result) result(true);
  }, [result]);



  const questionCounter = useMemo(() => {
    if (trainerTest) {
      return <div className={styles['groupName']}>{getName(questions[currentPage].group)}</div>;
    }
    return (
      <div style={{ color: color.HeaderPracticeTestQuestionColors }} className={styles['count-questions']}>
        <span className={styles.questions} >Question</span>
        <span className={styles.questionsM} >Q</span>
        <span>{currentPage + 1}</span>
        <span>of</span>
        <span>{typeOftest === "MockTest" ?visibleQuestions?.length :questions.length}</span>
      </div>
    );
  }, [trainerTest, color.textColor, currentPage,questions]);

  return (
    <>
    <div style={{ backgroundColor: color.headerColors }} className={styles.wrap}>
      
      <button onClick={handleModalClose} className={`${styles.exitBtn}`} >
        Exit
      </button>
      <button style={{ backgroundColor: color.headerColors,color:color.textColor }} onClick={handleModalClose} className={`${styles.exitBtnM}`} >
        Exit
      </button>
      {questionCounter}
      <button onClick={handleResults} className={styles.finishBtn} >
        {finish}
      </button>
      <button style={{ backgroundColor: color.headerColors,color:color.textColor }} onClick={handleResults} className={styles.finishBtnM} >
        {finish}
      </button>
    </div>
    {showExitModal && (
        <Modal 
          close={handleExit} 
          text="" 
          title="Are you sure you want to exit from the test?" 
          cancelClick={handleModalCancel}
          cancel={true} 
          blueBtnText="Exit test" 
        />
      )}
      {showResultsModal && typeOftest !== "MockTest" && (
        <Modal 
          close={handleResultsModalClose} 
          text="Are you sure you want to finish current test and see the test results?" 
          title="End of test" 
          cancelClick={handleResultsModalCancel}
          cancel={true} 
          blueBtnText="Show results" 
        />
      )}
    </>
  );
});

export default HeaderForTest;
