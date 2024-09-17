import { useState } from 'react';
import styles from './Par.module.scss';
import { CirclePercent } from '../../UI/CirclePercent/CirclePercent';
import { RootState } from '../../store/store';
import {  updateQuestion } from '../../store/practice.slice'; 
import { useDispatch, useSelector } from 'react-redux';

interface ParProps {
    name: string;
    quantity: number;
    percent: number;
    svg: React.ReactNode;
    id: string;
}

export default function Par({ name, quantity, percent, svg, id }: ParProps) {
    const dispatch = useDispatch();

    const practice = useSelector((state: RootState) => state.practice);

    const [isSelected, setIsSelected] = useState(() => 
        practice.question.some((element) => element.id === id)
    );

    const click = () => {
        const newSelectedState = !isSelected;
        setIsSelected(newSelectedState);
        if (newSelectedState) {
            const updatedQuestions = [...practice.question, { id }];
            dispatch(updateQuestion(updatedQuestions));   
        } else {
            const updatedQuestions = practice.question.filter((element) => element.id !== id);
            dispatch(updateQuestion(updatedQuestions));
        }
    };

    return (
        <div id={id} onClick={click} className={styles.wrap}>
            <div className={styles.title}>
                <div className={isSelected ? styles.active : styles.notActive}>{svg}</div>
                <span>{name} ({quantity})</span>
            </div>
            <CirclePercent currentPercent={percent} />
        </div>
    );
}
