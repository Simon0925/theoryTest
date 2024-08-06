import { useEffect, useMemo, useState } from 'react';
import styles from './VariantsOfAnswers.module.scss';
import Variant from '../Variant/Variant';

interface Answer {
    answer: string;
    tOF: boolean;
    photo: boolean | string;
}

interface Result {
    id: string;
    question: string;
    status: boolean|string;
    group: string;
}

interface ParData {
    answer: string;
    tOF: boolean;
    photo: string | boolean;
}

interface VariantsOfAnswersProps {
    id: string;
    question: string;
    group: string;
    par: ParData[];
}

export default function VariantsOfAnswers({
    par,
    question,
    id,
    group,
}: VariantsOfAnswersProps) {

    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const currentAnswers: Answer[] = useMemo(() => Object.values(par), [par]);

    useEffect(() => {
        setSelectedOption(null);
        updateLocalStorage();
    }, [par, question, id, group]);

    const updateLocalStorage = () => {
        const localS = localStorage.getItem('result');
        let resultData: Result[] = [];

        if (localS) {
            try {
                resultData = JSON.parse(localS);
            } catch (error) {
                console.error('Failed to parse local storage data:', error);
            }
        }

        const isQuestionPresent = resultData.some((elem: Result) => elem.id === id);

        if (!isQuestionPresent) {
            const newResult: Result = {
                id,
                question,
                status: 'pass',
                group,
            };

            resultData.push(newResult);
        }
        localStorage.setItem('result', JSON.stringify(resultData));

    };

    const handleSelect = (index: number) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);

        const localS = localStorage.getItem('result');
        let resultData: Result[] = [];

        if (localS) {
            try {
                resultData = JSON.parse(localS);
            } catch (error) {
                console.error('Failed to parse local storage data:', error);
                return;
            }
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

        localStorage.setItem('result', JSON.stringify(updatedResults));
    };

    return (
        <div className={styles.wrap}>
            <span className={styles.title}>Choose 1 answer</span>
            <div className={styles.variants}>
                {currentAnswers.map((answer, index) => (
                    <Variant
                        index={index}
                        selectedOption={selectedOption}
                        key={index}
                        color={selectedOption === index ? 'white' : '#0078AB'}
                        click={() => handleSelect(index)}
                        answer={answer.answer}
                        correct={answer.tOF}
                        backgroundColor={
                            selectedOption === index
                                ? answer.tOF
                                    ? '#00B676'
                                    : '#AA3B36'
                                : 'white'
                        }
                        photo={answer.photo}
                    />
                ))}
            </div>
        </div>
    );
}
