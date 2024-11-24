import React, { useState, useCallback, useEffect } from 'react';
import styles from './HeaderForTest.module.scss';
import Modal from '../Modal/Modal';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { handleExit as exitHandler } from './services/handleExit';
import ReactDOM from 'react-dom';
import QuestionCounterHeader from '../QuestionCounterHeader/QuestionCounterHeader';
import { useIsAnswerSelected } from '../../hooks/useIsAnswerSelected';

interface HeaderForTestProps {
  onExitClick: (e: boolean) => void;
  finish: string;
  result: (e: boolean) => void;
  typeOftest: string;
}

const HeaderForTest = React.memo(function HeaderForTest({
  finish,
  onExitClick,
  result,
  typeOftest,
}: HeaderForTestProps) {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const color = useSelector((state: RootState) => state.color.themeData);

  const modalRoot = document.getElementById('modal-root');

  const { questions, currentPage } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );

  const handleResults = useCallback(() => {
    if (typeOftest === 'MockTest' && result) {
      result(true);
    } else {
      setShowResultsModal((prev) => !prev);
    }
  }, [typeOftest, result]);

  const handleResultsModalClose = useCallback(() => {
    if (result) result(true);
  }, [result]);

  const isAnswerSelected = useIsAnswerSelected(typeOftest);
  
  useEffect(() => {
  
    if (isAnswerSelected && questions[currentPage].id === questions[questions.length - 1].id) {
      handleResults()
    }
  }, [questions, isAnswerSelected]);

  return (
    <>
      <div style={{ backgroundColor: color.headerColors }} className={styles.wrap}>
        <button onClick={()=>setShowExitModal(true)} className={`${styles.exitBtn}`}>
          Exit
        </button>
        <button
          style={{ backgroundColor: color.headerColors, color: color.textColor }}
          onClick={()=>setShowExitModal(true)}
          className={`${styles.exitBtnM}`}
        >
          Exit
        </button>
        <QuestionCounterHeader typeOftest={typeOftest} />
        <button onClick={handleResults} className={styles.finishBtn}>
          {finish}
        </button>
        <button
          style={{ backgroundColor: color.headerColors, color: color.textColor }}
          onClick={handleResults}
          className={styles.finishBtnM}
        >
          {finish}
        </button>
      </div>
      {showExitModal &&
        modalRoot &&
        ReactDOM.createPortal(
          <Modal
            close={() => exitHandler(typeOftest, dispatch, onExitClick)}
            text=""
            title="Are you sure you want to exit from the test?"
            cancelClick={()=>setShowExitModal(false)}
            cancel={true}
            blueBtnText="Exit test"
          />,
          modalRoot
        )}
      {showResultsModal &&
        typeOftest !== 'MockTest' &&
        modalRoot &&
        ReactDOM.createPortal(
          <Modal
            close={handleResultsModalClose}
            text="Are you sure you want to finish current test and see the test results?"
            title="End of test"
            cancelClick={()=>setShowResultsModal(!showResultsModal)}
            cancel={true}
            blueBtnText="Show results"
          />,
          modalRoot
        )}
    </>
  );
});

export default HeaderForTest;
