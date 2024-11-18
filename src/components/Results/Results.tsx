import { useEffect, useState } from "react";
import styles from "./Results.module.scss";
import OkVectorSvg from "../../SVG/OkVectorSvg/OkVectorSvg";
import CrossSvg from "../../SVG/CrossSvg/CrossSvg";
import HeaderResults from "../HeaderResults/HeaderResults";
import CircularProgressBar from "../../UI/CircularProgressBar/CircularProgressBar";
import currentDate from "./service/date";
import { QuestionResult, statisticData } from './interface/interface';
import { mockTestData } from './service/mockTestData';
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import hostname from "../../config/hostname";

import {postResult} from './service/postResult';
import useCookie from "../../hooks/useCookie";


interface ResultsProps {
  exitResult: (e: boolean) => void;
  time?: string;
  typeOftest: string;
}

export default function Results({ exitResult, time, typeOftest }: ResultsProps) {

  const color = useSelector((state: RootState) => state.color);

  const accessToken = useCookie('accessToken');

  
  const {results, questions } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );
  
  const [statisticData, setStatisticData] = useState<statisticData>();
  const [data, setData] = useState<QuestionResult[]>([]);
  const [answered, setAnswered] = useState(0);
  const [mockTestTrueAnswer, setMockTestTrueAnswer] = useState<number>();

  
  const [progressBar, setProgressBar] = useState({
    pass: 0,
    falseAnswer: 0,
    trueAnswer: 0,
  });

  useEffect(() => {
    const correctAnswers = data.filter((elem) => elem.status === true).length;
    setAnswered(correctAnswers);
  }, [data]);

  useEffect(() => {
    if (mockTestTrueAnswer !== undefined && typeOftest === "MockTest") {
      const date = currentDate();
      const percentage = mockTestTrueAnswer ? (mockTestTrueAnswer * 100) / 50 : 0;
      setStatisticData({ time, date, percentage });
    }
  }, [mockTestTrueAnswer, time, typeOftest]);

  useEffect(() => {
    if (typeOftest === "MockTest" && questions.length > 0) {
      if (data.length === 0) {
        const mockTestResults = mockTestData(questions, results);
        setData(mockTestResults);
      }
    } else if (results.length > 0) {
      setData(results);
    }
  }, [questions, results, typeOftest]);


  useEffect(() => {
    if (data.length > 0) {
      const total = data.length;
      const counts = data.reduce(
        (acc, e) => {
          if (e.status === "pass" ||e.status === undefined ) acc.pass += 1;
          else if (e.status === false) acc.falseAnswer += 1;
          else if (e.status === true) acc.trueAnswer += 1;
          return acc;
        },
        { pass: 0, falseAnswer: 0, trueAnswer: 0 }
      );

      if (total > 0) {
        setProgressBar({
          pass: Math.floor((counts.pass / total) * 100),
          falseAnswer: Math.floor((counts.falseAnswer / total) * 100),
          trueAnswer: Math.floor((counts.trueAnswer / total) * 100),
        });
        setMockTestTrueAnswer(counts.trueAnswer);
      }
    }
  }, [data]);


  useEffect(() => {

    if (results.length > 0 && typeOftest !== "MockTest"&&accessToken) {
      try {
        const dataToSend = { token: accessToken, data: results };
        if(dataToSend.token !== null){
           postResult(dataToSend,typeOftest);
        } 
      } catch (error) {
        console.error("Error posting local storage data:", error);
      }
    } else if (data.length > 0 && typeOftest === "MockTest" && statisticData !== undefined) {
      const dataToSend = {
        token: accessToken,
        data: results,
        statisticData,
        mockTest: typeOftest,
      };
  
      postResult(dataToSend,typeOftest);
    }
  }, [results,questions,statisticData,accessToken]);



  return (
    <>
      <div style={{ backgroundColor: color.hoverColor }}  className={styles.wrap}>
        <HeaderResults exitResult={exitResult} typeOftest={typeOftest} />

        <div className={styles.statistic}>
          <div className={styles.containerProgressBar}>
            <div className={styles.progressBar}>
            {
              Number.isFinite(progressBar.trueAnswer) &&
              Number.isFinite(progressBar.pass) &&
              Number.isFinite(progressBar.falseAnswer) &&
              (progressBar.trueAnswer > 0 || progressBar.pass > 0 || progressBar.falseAnswer > 0) && (
                <CircularProgressBar 
                  mockTest={typeOftest === "MockTest"}
                  correct={progressBar.trueAnswer}
                  skipped={progressBar.pass}
                  incorrect={progressBar.falseAnswer}
                />
              )
              }
            </div>
          </div>
          {data.length > 0 && (
            <span style={{ color: color.textColor }} className={styles["title"]}>
              <p>You have answered</p>
              <p>{answered} out of {data.length} questions correctly</p>
            </span>
          )}
        </div>
        <div className={styles.question}>
          {data.length > 0 ? (
            data.map((elem, index) => (
              <div style={{background:color.VariantBackground}} key={index} className={styles.variant}>
                <div className={elem.flag ? styles["marker"] : styles["inactive-marker"]}></div>
                <div className={styles.content}>
                    {elem.photo && (
                    <img
                        className={styles.img}
                        src={`${hostname}${elem.photo}`}
                        alt="Related to the question" 
                        loading="lazy" 
                    />
                    )}
                  <span style={{color:color.TestcolorText}}>{elem.question}</span>
                </div>
                <div className={styles.box}>
                {elem.status === null || elem.status === undefined || elem.status === "pass"
                      ? null 
                      : elem.status === false 
                        ? <CrossSvg /> 
                        : <OkVectorSvg />}
                </div>
              </div>
            ))
          ) : (
            <div className={styles["no-results"]}>
              <p>No results available. Take the test first.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
