import { useEffect, useState } from "react";
import styles from "./Results.module.scss";
import OkVectorSvg from "../../SVG/OkVectorSvg/OkVectorSvg";
import CrossSvg from "../../SVG/CrossSvg/CrossSvg";
import HeaderResults from "../../components/HeaderResults/HeaderResults";
import service from "../../service/service";
import idUser from "../../config/idUser";
import CircularProgressBar from "../../UI/CircularProgressBar/CircularProgressBar";

interface QuestionResult {
    id: string;
    question: string;
    status: boolean | string;
    group: string;
}

export default function Results() {
    const localS = localStorage.getItem("result");

    const [data, setData] = useState<QuestionResult[]>([]);
    const [answered, setAnswered] = useState(0);

    const [progressBar, setProgressBar] = useState({
        pass: 0,
        falseAnswer: 0,
        trueAnswer: 0,
    });

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
        }
    }, [data, answered]);

    useEffect(() => {
        if (localS) {
            try {
                const parsedData: QuestionResult[] = JSON.parse(localS);
                const dataToSend = {
                    userId: idUser,
                    data: parsedData,
                };
                service.postQuestionsGroup(dataToSend);
            } catch (error) {
                console.error("Error parsing local storage data during posting:", error);
            }
        }
    }, [localS]);

    useEffect(() => {
        if (localS) {
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
    }, [localS]);

    useEffect(() => {
        const correctAnswers = data.filter((elem) => elem.status === true || elem.status === "pass").length;
        setAnswered(correctAnswers);
    }, [data]);

    return (
        <>
            <HeaderResults />
            <div className={styles.ProgressBar}>
                <CircularProgressBar correct={progressBar.trueAnswer} skipped={progressBar.pass} incorrect={progressBar.falseAnswer} />
            </div>
            <span className={styles["title"]}>
                <p>You have answered</p>
                <p>{answered} out of {data.length} questions correctly</p>
            </span>

            <div className={styles.wrap}>
                {data.length > 0 ? (
                    data.map((elem, index) => (
                        <div key={index} className={styles.variant}>
                            <span>{elem.question}</span>
                            <div className={styles.box}>
                                {elem.status === "pass" ? null : (elem.status === false ? <CrossSvg /> : <OkVectorSvg />)}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results available.</p>
                )}
            </div>
        </>
    );
}
