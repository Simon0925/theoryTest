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
import { shallowEqual,useSelector } from "react-redux";
import { RootState } from "../../store/store";



interface ResultsProps {
    exitResult: (e: boolean) => void;
    time?: string;
    question?: Question[];
    typeOftest:string;
}

export default function Results({ exitResult,  time, question,typeOftest }: ResultsProps) {


    const {results } = useSelector(
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
        if (typeOftest === 'MockTest'  && mockTestTrueAnswer != undefined) {
            const date = currentDate();
            const percentage = mockTestTrueAnswer != 0 ? (mockTestTrueAnswer * 100) / 50 : 0;
            setStatisticData({
                time: time,
                date: date,
                percentage: percentage
            });
        }

    }, [ mockTestTrueAnswer]);

    useEffect(() => {
        if (typeOftest === 'MockTest' && question) {
            if (data.length === 0) {
                const mockTestResults = mockTestData(question, results);
                setData(mockTestResults);
            }
        } else if (results) {
            try {
                setData(results);
            } catch (error) {
                console.error("Error parsing local storage data:", error);
            }
        }
    }, [ question]);

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
        if (results && typeOftest !== 'MockTest' ) {
            try {
                const dataToSend = {
                    userId: idUser,
                    data: results,
                };
                service.postQuestionsGroup(dataToSend);
            } catch (error) {
                console.error("Error posting local storage data:", error);
            }
        }else if(data.length > 0 && typeOftest === 'MockTest' && statisticData && results){
            const dataToSend = {
                userId: idUser,
                data:results,
                statisticData:statisticData,
                mockTest:typeOftest
            };
            service.postQuestionsGroup(dataToSend);
        }
    }, [statisticData,data]);

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
                        <CircularProgressBar mockTest={typeOftest === 'MockTest'} 
                        correct={progressBar.trueAnswer} 
                        skipped={progressBar.pass} 
                        incorrect={progressBar.falseAnswer} />
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