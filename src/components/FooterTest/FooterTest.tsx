import { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import Modal from '../Modal/Modal';
import ArrowPrevSmallSvg from '../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg';
import FlagSvg from '../../SVG/FlagSvg/FlagSvg';
import styles from './FooterTest.module.scss';
import { RootState } from '../../store/store';
import {
  setCurrentQuestions,
  updateCurrentPage,
  updateResult,
} from '../../store/currentData/currentData.slice';
import { updateQuestionsAndResults } from '../../service/serviceFooter/updateQuestionsAndResults';
import ReactDOM from "react-dom";

interface FooterTestProps {
  result?: (e: boolean) => void;
  typeOftest: string;
}

export default function FooterTest({ result, typeOftest }: FooterTestProps) {
  const dispatch = useDispatch();

  const { questions, currentPage, answeredVariants, results } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );

  const color = useSelector((state: RootState) => state.color);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const modalRoot = document.getElementById("modal-root");
  
  const isAnswerSelected = useMemo(
    () => answeredVariants.some((e) => questions[currentPage]?.id === e.id),
    [answeredVariants, currentPage, questions]
  );

  const changeFlag = useCallback(() => {
    if (!questions[currentPage]) return;
    const { updatedQuestions, updatedResults } = updateQuestionsAndResults(
      questions,
      results,
      currentPage
    );
    dispatch(setCurrentQuestions({ testId: typeOftest, questions: updatedQuestions }));
    dispatch(updateResult({ testId: typeOftest, result: updatedResults }));
  }, [currentPage, questions, results, dispatch, typeOftest]);

  const navigatePage = useCallback(
    (direction: 'previous' | 'next') => {
      if (direction === 'previous' && currentPage > 0) {
        dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage - 1 }));
      } else if (direction === 'next') {
        const isLastPage = currentPage === questions.length - 1;
        if (isLastPage) {
          setModalVisible(true);
        } else {
          dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage + 1 }));
        }
      }
    },
    [currentPage, dispatch, questions.length, typeOftest]
  );

  const handleResultModal = useCallback(() => {
    if (result) result(true);
    setModalVisible(false);
  }, [result]);

  return (
    <div className={styles.wrap} style={{ backgroundColor: color.headerColors }}>
      <div className={styles.container}>
        <ButtonTest
          click={() => navigatePage('previous')}
          name="< Previous"
          color={color.TestcolorText}
          backgroundColor={currentPage > 0 ? color.FooterBackgroundBtn : color.PreviousTestBackgroundBtn}
        />
        <ButtonTest
          click={changeFlag}
          name=""
          color={color.TestcolorText}
          backgroundColor={color.FooterBackgroundBtn}
          svg
          svgColor={questions[currentPage]?.flag? true : color.FlagColorSvgBtn}
        />
        <ButtonTest
          click={() => setIsExplanationVisible(true)}
          name="Explanation"
          color={color.TestcolorText}
          backgroundColor={color.FooterBackgroundBtn}
        />
        <ButtonTest
          click={() => navigatePage('next')}
          name={questions.length === currentPage + 1 ? 'Results' : 'Next >'}
          color={isAnswerSelected ? color.FooterColorNextBtnSelectedOption : color.TestcolorText}
          backgroundColor={isAnswerSelected ? color.FooterBackgroundNextBtnSelectedOption : color.FooterBackgroundBtn}
        />
      </div>
      <div className={styles.mobileContainer}>
        <button style={{ backgroundColor: color.headerColors,color:color.textColor }}  onClick={() => navigatePage('previous')} className={styles.prevBtn}>
          <ArrowPrevSmallSvg color={color.textColor}  width="30px" height="30px" /> Prev
        </button>
        <button style={{ backgroundColor: color.headerColors}}  onClick={changeFlag} className={styles.flagBtn}>
          <FlagSvg color={questions[currentPage]?.flag ? '#F9921A' : color.textColor} width="24px" height="24px" />
        </button>
        <button style={{ backgroundColor: color.headerColors,color:color.textColor }} onClick={() => setIsExplanationVisible(true)} className={styles.explanationBtn}>
          ?
        </button>
        <button style={{ backgroundColor: color.headerColors,color:color.textColor }}  onClick={() => navigatePage('next')} className={styles.nextBtn}>
          Next <ArrowPrevSmallSvg color={color.textColor} width="30px" height="30px" />
        </button>
      </div>
     
         {isModalVisible&& modalRoot &&
          ReactDOM.createPortal(
        <Modal
          close={handleResultModal}
          text="End of test reached"
          title="Would you like to see the test results?"
          cancel
          cancelClick={() => setModalVisible(false)}
          blueBtnText="Show results"
        />,modalRoot
        )}
      {isExplanationVisible && (
        <Modal
          close={() => setIsExplanationVisible(false)}
          text={questions[currentPage]?.explanation || 'No explanation available'}
          title="Explanation"
          blueBtnText="Ok"
        />
      )}
    </div>
  );
}
