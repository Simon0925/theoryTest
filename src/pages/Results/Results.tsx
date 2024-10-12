import { useEffect, useState } from "react";
import styles from "./Results.module.scss";
import OkVectorSvg from "../../SVG/OkVectorSvg/OkVectorSvg";
import CrossSvg from "../../SVG/CrossSvg/CrossSvg";
import HeaderResults from "../../components/HeaderResults/HeaderResults";
import service from "../../service/service";
import idUser from "../../config/idUser";
import CircularProgressBar from "../../UI/CircularProgressBar/CircularProgressBar";
import currentDate from "./service/date";

import { QuestionResult, statisticData, Question } from './interface/interface';
import { mockTestData } from './service/mockTestData';

interface ResultsProps {
    exitResult: (e: boolean) => void;
    time?: string;
    mockTest?: boolean;
    question?: Question[];
}

export default function Results({ exitResult, mockTest, time, question }: ResultsProps) {
    const localS = localStorage.getItem("result");
    
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
        if (mockTest && mockTestTrueAnswer != undefined) {
            const date = currentDate();
            const percentage = mockTestTrueAnswer != 0 ? (mockTestTrueAnswer * 100) / 50 : 0;
            setStatisticData({
                time: time,
                date: date,
                percentage: percentage
            });
        }

    }, [mockTest, mockTestTrueAnswer]);

    useEffect(() => {
        if (mockTest && question) {
            if (data.length === 0) {
                const localStorageData = JSON.parse(localS || "[]");
                const mockTestResults = mockTestData(question, localStorageData);
                setData(mockTestResults);
            }
        } else if (localS) {
            try {
                const parsedData: QuestionResult[] = JSON.parse(localS);
                if (Array.isArray(parsedData)) {
                    setData(parsedData);
                } else {
                    setData([parsedData]);
                }
            } catch (error) {
                console.error("Error parsing local storage data:", error);
            }
        }
    }, [mockTest, question, localS]);

    useEffect(() => {
        const total = data.length;
        const counts = data.reduce(
            (acc, e) => {
                if (e.status === "pass") acc.pass += 1;
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
    }, [data]);

    useEffect(() => {
        if (localS && !mockTest) {
            try {
                const parsedData: QuestionResult[] = JSON.parse(localS);
                const dataToSend = {
                    userId: idUser,
                    data: parsedData,
                };
                service.postQuestionsGroup(dataToSend);
            } catch (error) {
                console.error("Error posting local storage data:", error);
            }
        }else if(data.length > 0 && mockTest && statisticData && localS){
            const parsedData: QuestionResult[] = JSON.parse(localS);
            const dataToSend = {
                userId: idUser,
                data:parsedData,
                statisticData:statisticData,
                mockTest:mockTest
            };
            service.postQuestionsGroup(dataToSend);
        }
    }, [localS, mockTest,statisticData,data]);

    useEffect(() => {
        const correctAnswers = data.filter((elem) => elem.status === true ).length;
        setAnswered(correctAnswers);
    }, [data]);

    return (
        <>
            <HeaderResults exitResult={exitResult} />
            <div className={styles.wrap}>
                <div className={styles.statistic}>
                    <div className={styles.progressBar}>
                        <CircularProgressBar mockTest={mockTest} correct={progressBar.trueAnswer} skipped={progressBar.pass} incorrect={progressBar.falseAnswer} />
                    </div>
                    {data.length > 0 ? 
                         <span className={styles["title"]}>
                            <p>You have answered</p>
                            <p>{answered} out of {data.length} questions correctly</p>
                         </span>
                        :
                        null
                    }
                </div>
                <div className={styles.question}>
                    {data.length > 0 ? (
                        data.map((elem, index) => (
                            <div key={index} className={styles.variant}>
                                <div className={elem.flag ? styles['marker'] : styles['inactive-marker']}></div>
                                <span>{elem.question}</span>
                                <div className={styles.box}>
                                    {elem.status === "pass" ? null : (elem.status === false ? <CrossSvg /> : <OkVectorSvg />)}
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
