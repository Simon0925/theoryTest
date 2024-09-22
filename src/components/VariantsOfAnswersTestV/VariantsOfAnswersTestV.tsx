import styles from "./VariantsOfAnswersTestV.module.scss";
import { useEffect, useMemo, useState } from 'react';
import Variant from '../Variant/Variant';
import { shuffleArray } from '../VariantsOfAnswers/service/shuffleArray'; 
import { updateLocalStorage } from '../VariantsOfAnswers/service/updateLocalStorage'; 

export interface Answer {
    answer: string;
    tOF: boolean;
    photo: boolean | string;
}

interface Result {
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

interface VariantsOfAnswersTestVProps {
    id: string;
    question: string;
    group: string;
    par: ParData[];
    click: (e: string) => void;
    currentFlag: boolean | undefined;
    typeOftest: string; 
    nextPage:(e:number) => void
    currentPage:number
}

export default function VariantsOfAnswersTestV({
    par,
    question,
    id,
    group,
    click,
    currentFlag,
    typeOftest,
    nextPage,
    currentPage
}: VariantsOfAnswersTestVProps){

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [selected, setSelected] = useState<{ id: string, index: number }[]>([]);

    const shuffledAnswers = useMemo(() => shuffleArray(par), [par]);

    useEffect(() => {
        const found = selected.find(e => e.id === id);
        setSelectedOption(found ? found.index : null);
        updateLocalStorage(id, question, group, currentFlag); 
    }, [id, selected, question, group, currentFlag]);

    const handleSelect = (index: number) => {
        // Если уже выбран вариант и это не первый раз (в режиме MockTest), то не переходим на другую страницу
        if (selectedOption !== null && typeOftest !== "MockTest") return;
    
        // Если это режим MockTest и уже есть выбранный вариант, обновляем ответ и остаёмся на той же странице
        if (typeOftest === "MockTest" && selectedOption !== null) {
            setSelected(prev => prev.map(item => 
                item.id === id ? { ...item, index } : item
            ));
        } else {
            // Если первый раз выбираем ответ, добавляем его в список
            setSelected(prev => [...prev, { index, id }]);
            // Переход на следующую страницу
            nextPage(currentPage + 1);
        }
    
        // Устанавливаем выбранный вариант
        setSelectedOption(index);
        click(id);
    
        // Обновляем результат в локальном хранилище
        const localS = localStorage.getItem('result');
        if (localS) {
            try {
                const resultData = JSON.parse(localS) as Result[];
                const updatedResults = resultData.map(elem =>
                    elem.id === id ? { ...elem, status: shuffledAnswers[index].tOF } : elem
                );
                localStorage.setItem('result', JSON.stringify(updatedResults));
            } catch (error) {
                console.error('Failed to parse local storage data:', error);
            }
        }
    };
    
    const getBackgroundColor = (index: number, correct: boolean) => {
        if (selectedOption === index) {
            if (typeOftest === "MockTest") {
                return "#FEEC49"; 
            }
            return correct ? '#00B676' : '#AA3B36'; 
        }
        return 'white'; 
    };

    const getTextColor = (index: number) => {
        if (typeOftest === "MockTest") {
            return selectedOption === index ? '#0078AB' : '#0078AB'; 
        } else {
            return selectedOption === index ? 'white' : '#0078AB'; 
        }
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
                        color={getTextColor(index)}
                        click={() => handleSelect(index)}
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
