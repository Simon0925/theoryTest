import { useEffect, useState } from 'react';

import styles from './VariantsOfAnswers.module.scss';
import Variant from '../Variant/Variant';

interface Answer {
    answer: string;
    tOF: boolean;
}

interface Result {
    id: string;
    questions: string;
    status: boolean;
}

interface VariantsOfAnswersProps {
    id: string;
    questions: string;
    par: {
        v1: Answer;
        v2: Answer;
        v3: Answer;
        v4: Answer;
    };
}

export default function VariantsOfAnswers({ par, questions, id }: VariantsOfAnswersProps) {
    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    useEffect(() => {

        setCurrentAnswers(Object.values(par));
        setSelectedOption(null);

        const localS = localStorage.getItem("result");

        let resultData: Result[] = [];
        try {
            
            if (localS) {
                resultData = JSON.parse(localS) || [];
            }

          
            const isQuestionPresent = resultData.some((elem: Result) => elem.id === id);

            if (!isQuestionPresent) {
                const newResult: Result = {
                    id: id,
                    questions: questions,
                    status: false, 
                };

                resultData.push(newResult);
                localStorage.setItem("result", JSON.stringify(resultData));
            }
        } catch (error) {
            console.error("Failed to parse local storage data:", error);
            resultData = [];
        }
    }, [par, questions, id]);

    const handleSelect = (index: number) => {
        if (selectedOption === null) {
            setSelectedOption(index);

            const localS = localStorage.getItem("result");
            let resultData: Result[] = [];

            try {
                if (localS) {
                    resultData = JSON.parse(localS) || [];
                }
                const updatedResults = resultData.map((elem: Result) => {
                    if (elem.id === id) {
                        return {
                            ...elem,
                            status: currentAnswers[index].tOF,
                        };
                    }
                    return elem;
                });

                localStorage.setItem("result", JSON.stringify(updatedResults));
            } catch (error) {
                console.error("Failed to parse or update local storage data:", error);
            }
        }
    };

    return (
        <div className={styles['wrap']}>
            <span className={styles['title']}>Choose 1 answer</span>
            <div className={styles['variants']}>
                {currentAnswers.map((answer, index) => (
                    <Variant
                        key={index}
                        color={selectedOption === index ? 'white' : '#0078AB'}
                        selected={selectedOption === index}
                        click={() => handleSelect(index)}
                        question={answer.answer}
                        correct={answer.tOF}
                        backgroundColor={
                            selectedOption === index
                                ? answer.tOF
                                    ? '#00B676'
                                    : '#AA3B36'
                                : 'white'
                        }
                    />
                ))}
            </div>
        </div>
    );
}
