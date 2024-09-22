import styles from './VariantsOfAnswers.module.scss';
import { useEffect, useMemo, useState } from 'react';
import Variant from '../Variant/Variant';
import { shuffleArray } from './service/shuffleArray'; 
import { updateLocalStorage } from './service/updateLocalStorage'; 

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

interface VariantsOfAnswersProps {
    id: string;
    question: string;
    group: string;
    par: ParData[];
    click: (e: string) => void;
    currentFlag: boolean | undefined;
    
}

export default function VariantsOfAnswers({
    par,
    question,
    id,
    group,
    click,
    currentFlag,
    
}: VariantsOfAnswersProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [selected, setSelected] = useState<{ id: string, index: number }[]>([]);

    const shuffledAnswers = useMemo(() => shuffleArray(par), [par]);

    useEffect(() => {
        const found = selected.find(e => e.id === id);
        setSelectedOption(found ? found.index : null);
        updateLocalStorage(id, question, group, currentFlag); 
    }, [id, selected, question, group, currentFlag]);

    const handleSelect = (index: number) => {
        if (selectedOption !== null) return;

        setSelected(prev => [...prev, { index, id }]);
        setSelectedOption(index);
        click(id);

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

    return (
        <div className={styles.wrap}>
            <span className={styles.title}>Choose 1 answer</span>
            <div className={styles.variants}>
                {shuffledAnswers.map((answer, index) => (
                    <Variant
                        key={index}
                        index={index}
                        selectedOption={selectedOption}
                        color={selectedOption === index ? 'white' : '#0078AB'}
                        click={() => handleSelect(index)}
                        answer={answer.answer}
                        correct={answer.tOF}
                        backgroundColor={selectedOption === index
                            ? answer.tOF ? '#00B676' : '#AA3B36'
                            : 'white'}
                        photo={answer.photo} typeOftest={''}                    />
                ))}
            </div>
        </div>
    );
}
