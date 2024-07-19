import { useState } from 'react';
import Variant from '../Variant/Variant';
import styles from './VariantsOfAnswers.module.scss';

export default function VariantsOfAnswers() {
    const [selectedOption, setSelectedOption] = useState<number | null>(null); 

    const [selected,setSelected] = useState(false)

    const questions = [
        {
            question: 'New speed limit 20 mph',
            correct: false
        },
        {
            question: 'New speed limit 20 mph',
            correct: true
        },
        {
            question: 'New speed limit 20 mph',
            correct: false
        },
        {
            question: 'New speed limit 20 mph',
            correct: false
        }
    ];

    const check = (index:number) => {
        if (selectedOption === null) {
            setSelectedOption(index); 
            setSelected(true)
            console.log(questions[index].question,`your answer ${questions[index].correct ? 'correct' : 'not correct'}`)
        }
    };



    return (
        <div className={styles['wrap']}>
            <span className={styles['title']}>Choose 1 answer</span>
            <div className={styles['variants']}>
                {questions.map((elem, index) => (
                    <Variant
                        color={selectedOption === index ?'white':'#0078AB'}
                        selected={selected}
                        key={index}
                        click={() => check(index)}
                        question={elem.question}
                        correct={elem.correct}
                        backgroundColor={
                            selectedOption === index
                                ? elem.correct
                                    ? '#00B676'
                                    : '#AA3B36'
                                :  'white'
                        }
                    />
                ))}
            </div>
        </div>
    );
}
