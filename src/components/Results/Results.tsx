import { useEffect, useState } from "react";
import styles from "./Results.module.scss";
import HeaderResults from "../HeaderResults/HeaderResults";
import CircularProgressBar from "../../UI/CircularProgressBar/CircularProgressBar";
import {useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {postResult} from './service/postResult';
import useCookie from "../../hooks/useCookie";
import ResultVariant from "../ResultVariant/ResultVariant";
import { useProgressBar } from "../../hooks/useResultsHooks/useProgressBar";
import { useMockTestData } from "../../hooks/useResultsHooks/useMockTestData";
import { useStatisticData } from "../../hooks/useResultsHooks/useStatisticData";
import CheckResultAnswer from "../CheckResultAnswer/CheckResultAnswer";


interface ResultsProps {
  exitResult: (e: boolean) => void;
  time?: string;
  typeOftest: string;
}

export default function Results({ exitResult, time, typeOftest }: ResultsProps) {


  const color = useSelector((state: RootState) => state.color.themeData);

  const accessToken = useCookie('accessToken');
  
  const {questions } = useSelector((state: RootState) => state.currentData.testsData[typeOftest]);
  const results  = useSelector((state: RootState) => state.currentData.testsData["Result"].questions);
  const resultsAnswers  = useSelector((state: RootState) => state.currentData.testsData["Result"].resultsAnswers);
  
 

  const [answered, setAnswered] = useState(0);
  const data = useMockTestData(typeOftest, questions, results);
  const { progressBar, mockTestTrueAnswer } = useProgressBar(data);
  const statisticData = useStatisticData(mockTestTrueAnswer, typeOftest, time);

  useEffect(() => {
    const correctAnswers = data.filter((elem) => elem.status === true).length;
    setAnswered(correctAnswers);
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
    
    {!resultsAnswers ?
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
              <ResultVariant
                key={index} 
                flag={elem.flag}
                photo={elem.photo}
                question={elem.question}
                status={elem.status}
                id={elem.id}
              />
            ))
          ) : (
            <div className={styles["no-results"]}>
              <p>No results available. Take the test first.</p>
            </div>
          )}
        </div>
      </div>
      :
      <CheckResultAnswer />
      }
    </>
  );
}
