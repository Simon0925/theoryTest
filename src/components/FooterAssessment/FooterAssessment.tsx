import ButtonTest from "../../UI/ButtonTest/ButtonTest";
import styles from "./FooterAssessment.module.scss";
import TimerAssessment from "../TimerAssessment/TimerAssessment";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../store/store";
import { setCurrentQuestions, updateCurrentPage, updateResult } from "../../store/currentData/currentData.slice";
import { updateQuestionsAndResults } from '../../service/serviceFooter/updateQuestionsAndResults';
import FlagSvg from "../../SVG/FlagSvg/FlagSvg";
import ArrowPrevSmallSvg from "../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg";
import PlayVectorSvg from "../../SVG/PlayVectorSvg/PlayVectorSvg";
import PauseSvg from "../../SVG/PauseSvg/PauseSvg";

interface FooterAssessmentProps {
  statusPause: (e: boolean) => void;
  getTime: (e: number | undefined) => void;
  review: (e: boolean) => void;
  typeOftest: string;
}

export default function FooterAssessment({
  statusPause,
  getTime,
  review,
  typeOftest,
}: FooterAssessmentProps) {
  
  const [pause, setPause] = useState(false);
  const [time, setTime] = useState<number | undefined>();
  const dispatch = useDispatch();
  const color = useSelector((state: RootState) => state.color);
  
  const { questions, currentPage, answeredVariants, results, visibleQuestions } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );

  const isAnswerSelected = useMemo(() => {
    const currentQuestion = visibleQuestions?.[currentPage];
    return currentQuestion ? answeredVariants.some(e => e.id === currentQuestion.id) : false;
  }, [answeredVariants, currentPage, visibleQuestions]);

  const next = useCallback(() => {
    if (currentPage < questions.length - 1) {
      dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage + 1 }));
    } else {
      review(true);
    }
  }, [currentPage, questions.length, dispatch, review, typeOftest]);

  const previous = useCallback(() => {
    if (currentPage > 0) {
      dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage - 1 }));
    }
  }, [currentPage, dispatch, typeOftest]);

  const changeFlag = useCallback(() => {
    const { updatedQuestions, updatedResults } = updateQuestionsAndResults(
      questions, 
      results, 
      currentPage,
      typeOftest,
      visibleQuestions
    );
    dispatch(setCurrentQuestions({ testId: typeOftest, questions: updatedQuestions }));
    dispatch(updateResult({ testId: typeOftest, result: updatedResults }));
  }, [currentPage, questions, results, dispatch, typeOftest, visibleQuestions]);

  useEffect(() => {
    getTime(time);
  }, [time]);

  const startPause = useCallback(() => {
    setPause(!pause);
    statusPause(!pause);
  }, [pause, statusPause]);

  return (
    <div style={{ backgroundColor: color.headerColors }} className={styles.wrap}>
      <div className={styles.container}>
        <ButtonTest
          click={previous}
          name="< Prev"
          color={color.TestcolorText}
          backgroundColor={currentPage > 0 ? color.FooterBackgroundBtn : color.PreviousTestBackgroundBtn}
        />
        <ButtonTest
          click={changeFlag}
          name=""
          color={color.TestcolorText}
          backgroundColor={color.FooterBackgroundBtn}
          svg={true}
          svgColor={visibleQuestions?.[currentPage]?.flag ? '#F9921A' : color.FlagColorSvgBtn}
        />
        <TimerAssessment color={color.textColor } time={setTime} pause={pause} />
        <ButtonTest
          click={startPause}
          name={pause ? "Resume" : "Pause"}
          color={color.TestcolorText}
          backgroundColor={color.FooterBackgroundBtn}
        />
        <ButtonTest
          click={next}
          name={currentPage + 1 < questions.length ? "Next >" : "Review"}
          color={isAnswerSelected ? color.FooterColorNextBtnSelectedOption : color.TestcolorText}
          backgroundColor={isAnswerSelected ? color.FooterBackgroundNextBtnSelectedOption : color.FooterBackgroundBtn}
        />
      </div>
      <div className={styles.mobileContainer}>
        <button style={{ backgroundColor: color.headerColors }}  onClick={previous} className={styles.prevBtn}>
          <ArrowPrevSmallSvg color={color.textColor } width="30px" height="30px" />
        </button>
        <button style={{ backgroundColor: color.headerColors }} onClick={changeFlag} className={styles.flagBtn}>
          <FlagSvg  color={visibleQuestions?.[currentPage]?.flag ? '#F9921A' : color.textColor} width="24px" height="24px" />
        </button>
        <TimerAssessment color={color.textColor } time={setTime} pause={pause} />
        <button style={{ backgroundColor: color.headerColors }} onClick={startPause} className={styles.btnPause}>
          {pause ? <PlayVectorSvg color={color.textColor} /> : <PauseSvg color={color.textColor} />}
        </button>
        <button style={{ backgroundColor: color.headerColors }}  onClick={next} className={styles.nextBtn}>
          <ArrowPrevSmallSvg color={color.textColor } width="30px" height="30px" />
        </button>
      </div>
    </div>
  );
}
