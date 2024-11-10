import ButtonTest from "../../UI/ButtonTest/ButtonTest";
import styles from "./FooterAssessment.module.scss";
import TimerAssessment from "../TimerAssessment/TimerAssessment";
import { useEffect, useMemo, useState, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setCurrentQuestions, updateCurrentPage, updateResult } from "../../store/currentData/currentData.slice";
import { updateQuestionsAndResults } from '../../service/serviceFooter/updateQuestionsAndResults';

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

  const { questions, currentPage, answeredVariants, results,visibleQuestions } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );

  const isAnswerSelected = useMemo(() => {
    const currentQuestion = visibleQuestions?.[currentPage];
    return currentQuestion ? answeredVariants.some(e => e.id === currentQuestion.id) : false;
  }, [answeredVariants, currentPage, visibleQuestions]);

  const next = useCallback(() => {
    if (currentPage <= questions.length - 1 && questions.length !== currentPage + 1 ) {
      dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage + 1 }));
    } else if (questions.length === currentPage + 1) {
      review(true);
    }
  }, [currentPage, questions.length, dispatch, review, typeOftest]);

  const previous = useCallback(() => {
    if (currentPage > 0) {
      dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage - 1 }));
    }
  }, [currentPage, dispatch, typeOftest]);

  const changeFlag = useCallback(() => {
    if (!questions[currentPage]) return;
    
    const { updatedQuestions, updatedResults } = updateQuestionsAndResults(
      questions, 
      results, 
      currentPage,
      typeOftest,
      visibleQuestions
    );
   
    dispatch(setCurrentQuestions({ testId: typeOftest, questions: updatedQuestions }));
    dispatch(updateResult({ testId: typeOftest, result: updatedResults }));
  }, [currentPage, questions, results, dispatch, typeOftest,visibleQuestions]);

  useEffect(() => {
    getTime(time);
  }, [time]);

  const startPause = useCallback(() => {
    setPause(prevPause => !prevPause);
    statusPause(!pause);
  }, [pause, statusPause]);
  useEffect(()=>{
    console.log("results",results)
  },[results])

  return (
    <div 
      style={{backgroundColor:color.headerColors}}
      className={styles.wrap}>
      <div className={styles.container}>
        <ButtonTest
          click={previous}
          name="< Previous"
          color={color.TestcolorText}
          backgroundColor={currentPage > 0 ? color.FooterBackgroundBtn: color.PreviousTestBackgroundBtn} 
          svg={false}
          svgColor={false}
        />
        <ButtonTest
        click={changeFlag}
        name=""
        color={color.TestcolorText}
        backgroundColor={color.FooterBackgroundBtn}
        svg={true}
        svgColor={visibleQuestions?.[currentPage]?.flag === true ? true : color.FlagColorSvgBtn}
      />
        <TimerAssessment time={setTime} pause={pause} />
        <ButtonTest
          click={startPause}
          name={!pause ? "Pause" : "Resume"}
          color={color.TestcolorText}
          backgroundColor={color.FooterBackgroundBtn}
          svg={false}
          svgColor={false}
        />
        <ButtonTest
          click={next}
          name={questions.length !== currentPage + 1 ? "Next >" : "Review"}
          color={isAnswerSelected ?  color.FooterColorNextBtnSelectedOption :color.TestcolorText}
          backgroundColor={isAnswerSelected ? color.FooterBackgroundNextBtnSelectedOption : color.FooterBackgroundBtn}
          svg={false}
          svgColor={false}
        />
      </div>
    </div>
  );
}
