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

  const { questions, currentPage, answeredVariants, results } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );

  const isAnswerSelected = useMemo(() => {
    return answeredVariants.some(e => questions[currentPage]?.id === e.id);
  }, [answeredVariants, currentPage, questions]);

  const next = useCallback(() => {
    if (currentPage < questions.length - 1) {
      dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage + 1 }));
    } else if (questions.length - 1 === currentPage) {
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
      currentPage
    );
   
    dispatch(setCurrentQuestions({ testId: typeOftest, questions: updatedQuestions }));
    dispatch(updateResult({ testId: typeOftest, result: updatedResults }));
  }, [currentPage, questions, results, dispatch, typeOftest]);

  useEffect(() => {
    getTime(time);
  }, [time]);

  const startPause = useCallback(() => {
    setPause(prevPause => !prevPause);
    statusPause(!pause);
  }, [pause, statusPause]);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <ButtonTest
          click={previous}
          name="< Previous"
          color="#0078AB"
          backgroundColor={currentPage > 0 ? "white" : "#91BCD6"} 
          svg={false}
          svgColor={false}
        />
        <ButtonTest
          click={changeFlag}
          name=""
          color="#0078AB"
          backgroundColor="white"
          svg={true}
          svgColor={questions[currentPage]?.flag === true} 
        />
        <TimerAssessment time={setTime} pause={pause} />
        <ButtonTest
          click={startPause}
          name={!pause ? "Pause" : "Resume"}
          color="#0078AB"
          backgroundColor="white"
          svg={false}
          svgColor={false}
        />
        <ButtonTest
          click={next}
          name={questions.length !== currentPage + 1 ? "Next >" : "Review"}
          color="#0078AB"
          backgroundColor={isAnswerSelected ? "#FFEC4B" : "white"} 
          svg={false}
          svgColor={false}
        />
      </div>
    </div>
  );
}
