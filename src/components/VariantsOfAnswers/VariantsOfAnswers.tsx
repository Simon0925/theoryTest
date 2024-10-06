import styles from "./VariantsOfAnswers.module.scss";
import { useEffect, useMemo, useState } from 'react';
import Variant from '../Variant/Variant';
import { shuffleArray } from './service/shuffleArray'; 
import {  handleSelect } from './service/handleSelect'; 
import {updateLocalStorage} from './service/updateLocalStorage'

export interface Answer {
    answer: string;
    tOF: boolean;
    photo: boolean | string;
}

export interface Result {
    id: string;
    question: string;
    status: boolean | string;
    group: string;
    flag: boolean;
}

interface ParData {
    answer: string;
    tOF: boolean;
    photo: string | boolean;
}

interface VariantsOfAnswersrops {
    id: string;
    question: string;
    group: string;
    par: ParData[];
    click: (e: string) => void;
    currentFlag: boolean | undefined;
    typeOftest: string; 
    nextPage: ((e: number) => void) | null;
    currentPage: number | null;
    setQuestionsSelected?: (selected: { id: string, index: number }[]) => void; 
}

export default function VariantsOfAnswers({
    par,
    question,
    id,
    group,
    click,
    currentFlag,
    typeOftest,
    nextPage,
    currentPage,
    setQuestionsSelected
}: VariantsOfAnswersrops) {

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [selected, setSelected] = useState<{ id: string, index: number }[]>([]);

    const shuffledAnswers = useMemo(() => shuffleArray(par), [par]);

    useEffect(() => {
        const found = selected.find(e => e.id === id);
        setSelectedOption(found ? found.index : null);
        updateLocalStorage(id, question, group, currentFlag);
        if (setQuestionsSelected) {
            setQuestionsSelected(selected);
        }
    }, [id, selected, question, group, currentFlag]);

    const getBackgroundColor = (index: number, correct: boolean) => {
        if (selectedOption === index) {
            if (typeOftest === "MockTest") {
                return "#FEEC49"; 
            }
            return correct ? '#00B676' : '#AA3B36'; 
        }
        return 'white'; 
    };

    return (
        <div className={styles.wrap}>
            <span className={styles.title}>Choose 1 answer</span>
            <div className={styles.variants}>
                {shuffledAnswers.map((answer, index) => (
                    <Variant
                        key={index}
                        index={index}
                        selectedOption={selectedOption}
                        color={'#0078AB'}
                        click={() => handleSelect(
                            index,
                            id,
                            setSelectedOption,
                            setSelected,
                            selectedOption,
                            typeOftest,
                            currentPage,
                            nextPage,
                            click,
                            shuffledAnswers
                        )} 
                        answer={answer.answer}
                        correct={answer.tOF}
                        backgroundColor={getBackgroundColor(index, answer.tOF)}
                        photo={answer.photo}
                        typeOftest={typeOftest}
                    />
                ))}
            </div>
        </div>
    );
}