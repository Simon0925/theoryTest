import ButtonTest from "../../UI/ButtonTest/ButtonTest";
import styles from "./FooterAssessment.module.scss";
import TimerAssessment from "../TimerAssessment/TimerAssessment";
import { useEffect, useState } from "react";

interface FooterAssessmentProps {
  currentPage: number;
  click: (e: number) => void;
  maxPage: number;
  setSelectedAnswer: string;
  id: string;
  statusPause: (e: boolean) => void;
  flag: boolean;
  onFlagChange: (id: string, newFlag: boolean) => void;
  getTime: (e: number | undefined) => void; 
}

export default function FooterAssessment({
  currentPage,
  click,
  maxPage,
  setSelectedAnswer,
  id,
  statusPause,
  flag,
  onFlagChange,
  getTime, 
}: FooterAssessmentProps) {
  const [answered, setAnswered] = useState<string[]>([]);
  const [flagged, setFlagged] = useState(flag);
  const [pause, setPause] = useState(false);

  const [time, setTime] = useState<number | undefined>();

  useEffect(() => {
    setFlagged(flag);
    statusPause(pause);
  }, [flag, , id, answered, pause, statusPause]);

  useEffect(()=>{
    if (setSelectedAnswer !== "" && !answered.includes(id)) {
      setAnswered((prev) => [...prev, id]);
    }
  },[setSelectedAnswer])

  const toggleFlag = () => {
    const localS = localStorage.getItem("result");
    if (localS) {
      const data = JSON.parse(localS);
      const updatedData = data.map((e: any) =>
        e.id === id ? { ...e, flag: !flagged } : e
      );
      localStorage.setItem("result", JSON.stringify(updatedData));
      setFlagged(!flagged);
      onFlagChange(id, !flagged);
    }
  };

  const previous = () => currentPage > 0 && click(currentPage - 1);
  const next = () => currentPage < maxPage - 1 && click(currentPage + 1);

  const isQuestionAnswered = answered.includes(id);

  useEffect(() => {
    getTime(time);
  }, [time, getTime]); 

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
          click={toggleFlag}
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
          click={next}
          name="Next >"
          color="#0078AB"
          backgroundColor={isQuestionAnswered ? "#FFEC4B" : "white"}
          svg={false}
          svgColor={false}
        />
      </div>
    </div>
  );
}
