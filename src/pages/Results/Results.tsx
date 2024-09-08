import { useEffect, useState } from "react";
import styles from "./Results.module.scss";
import OkVectorSvg from "../../SVG/OkVectorSvg/OkVectorSvg";
import CrossSvg from "../../SVG/CrossSvg/CrossSvg";
import HeaderResults from "../../components/HeaderResults/HeaderResults";
import service from "../../service/service";

import idUser from "../../config/idUser"

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
        const correctAnswers = data.filter((elem) => elem.status === true || elem.status === 'pass').length;
        setAnswered(correctAnswers);
    }, [data]);

    return (
        <>
            <HeaderResults />
            <span className={styles['title']}>
                You have answered {answered} out of {data.length} questions correctly
            </span>
            <div className={styles.wrap}>
                {data.length > 0 ? (
                    data.map((elem, index) => (
                        <div key={index} className={styles.variant}>
                            <span>{elem.question}</span>
                            <div className={styles.box}>
                                {elem.status === false || elem.status === 'pass' ? <CrossSvg /> : <OkVectorSvg /> }
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
