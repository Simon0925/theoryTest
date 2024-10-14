import styles from "./VariantsOfAnswers.module.scss";
import { useEffect, useMemo, useState } from 'react';
import Variant from '../Variant/Variant';
import { shuffleArray } from './service/shuffleArray'; 
import {  handleSelect } from './service/handleSelect'; 
import {updateLocalStorage} from './service/updateLocalStorage'

import {getBackgroundColor,getTextColor} from "./service/getColor"

import {VariantsOfAnswersrops} from "./interface"

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

    

    return (
        <div className={styles.wrap}>
            <span className={styles.title}>Choose 1 answer</span>
            <div className={styles.variants}>
                {shuffledAnswers.map((answer, index) => (
                    <Variant
                        textColor={getTextColor(index,typeOftest,selectedOption)}
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
                        backgroundColor={getBackgroundColor(index, answer.tOF,typeOftest,selectedOption)}
                        photo={answer.photo}
                        typeOftest={typeOftest}
                    />
                ))}
            </div>
        </div>
    );
}