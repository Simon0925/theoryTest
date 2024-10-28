import React, { useState, useCallback, useMemo } from 'react';
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
  children?: React.ReactNode;
  finish: string;
  mockTest?: boolean;
  reviewClick?: (e: boolean) => void;
  result?: (e: boolean) => void;
  trainerTest?: boolean;
  typeOftest: string;  
}

const HeaderForTest = React.memo(function HeaderForTest({
  finish,
  children,
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

  
  const { questions, currentPage} = useSelector(
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
      return <div className={styles['count-questions']}>{getName(questions[currentPage].group)}</div>;
    }
    return (
      <div style={{ color: color.HeaderPracticeTestQuestionColors }} className={styles['count-questions']}>
        <span>Question</span>
        <span>{currentPage + 1}</span>
        <span>of</span>
        <span>{questions.length}</span>
      </div>
    );
  }, [trainerTest, color.textColor, currentPage,questions]);

  return (
    <div style={{ backgroundColor: color.headerColors }} className={styles.wrap}>
      <ButtonTest
        name="Exit"
        color="white"
        backgroundColor="#A73530"
        svg={false}
        click={handleModalClose}
        svgColor={false}
      />
      {questionCounter}
      <ButtonTest
        name={finish}
        color="white"
        backgroundColor="#00B06F"
        svg={false}
        click={handleResults}
        svgColor={false}
      />
      {children && <div className={styles.extraContent}>{children}</div>}
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
    </div>
  );
});

export default HeaderForTest;
