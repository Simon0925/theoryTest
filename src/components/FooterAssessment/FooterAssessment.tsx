import ButtonTest from "../../UI/ButtonTest/ButtonTest";
import styles from "./FooterAssessment.module.scss";
import TimerAssessment from "../TimerAssessment/TimerAssessment";
import { useEffect, useState } from "react";

import {
  toggleFlag,
  handlePageNavigation,
} from "./service/FooterAssessmentService";

interface FooterAssessmentProps {
  currentPage: number;
  click: (e: number) => void;
  maxPage: number;
  setSelectedAnswers: { id: string, index: number }[];
  id: string;
  statusPause: (e: boolean) => void;
  flag: boolean;
  onFlagChange: (id: string, newFlag: boolean) => void;
  getTime: (e: number | undefined) => void;
  review:(e:boolean) => void
}
export default function FooterAssessment({
  currentPage,
  click,
  maxPage,
  setSelectedAnswers, 
  id,
  statusPause,
  flag,
  onFlagChange,
  getTime,
  review,
}: FooterAssessmentProps) {
  const [flagged, setFlagged] = useState(flag);
  const [pause, setPause] = useState(false);
  const [time, setTime] = useState<number | undefined>();
  const [isQuestionAnswered,setisQuestionAnswered] = useState(false)

  useEffect(() => {
    setFlagged(flag);
    statusPause(pause);
  }, [flag, id, pause, statusPause]);

  useEffect(() => {
    getTime(time);
  }, [time, getTime]);


  useEffect(() => {
    setSelectedAnswers.forEach(() =>{
      const questionAnswered = setSelectedAnswers.some(q => q.id === id);
      setisQuestionAnswered(questionAnswered)
    })
  }, [setSelectedAnswers,currentPage]);


  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <ButtonTest
          click={() => handlePageNavigation(currentPage, click, maxPage, "previous",review)}
          name="< Previous"
          color="#0078AB"
          backgroundColor={currentPage > 0 ? "white" : "#91BCD6"}
          svg={false}
          svgColor={false}
        />
        <ButtonTest
          click={() => toggleFlag(id, flagged, setFlagged, onFlagChange)}
          name=""
          color="#0078AB"
          backgroundColor="white"
          svg={true}
          svgColor={flagged}
        />
        <TimerAssessment time={setTime} pause={pause} />
        <ButtonTest
          click={() => setPause(!pause)}
          name={!pause ? "Pause" : "Resume"}
          color="#0078AB"
          backgroundColor="white"
          svg={false}
          svgColor={false}
        />
        <ButtonTest
          click={() => handlePageNavigation(currentPage, click, maxPage, "next",review)}
          name={currentPage !== maxPage ? "Next >" : "Review"}
          color="#0078AB"
          backgroundColor={isQuestionAnswered ? "#FFEC4B" : "white"}
          svg={false}
          svgColor={false}
        />
      </div>
    </div>
  );
}
