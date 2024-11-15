import { useEffect, useState, useMemo, memo } from 'react';
import styles from './Par.module.scss';
import { CirclePercent } from '../../UI/CirclePercent/CirclePercent';
import { RootState } from '../../store/store';
import { updateQuestion } from '../../store/practice/practice.slice';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

interface ParProps {
    name: string;
    quantity: number;
    percent: number;
    svg: React.ReactNode;
    id: string;
}

const Par = ({ name, quantity, percent, svg, id }: ParProps) => {
    const dispatch = useDispatch();
    
    const practice = useSelector((state: RootState) => state.practice);
    const color = useSelector((state: RootState) => state.color);


    const [isSelected, setIsSelected] = useState(false);

    const active = useMemo(() => practice.question.some((element) => element.id === id), [practice.question, id]);

    useEffect(() => {
        setIsSelected(active);
    }, [active]);

    const click = () => {
        const newSelectedState = !isSelected;
        setIsSelected(newSelectedState);
        const updatedQuestions = newSelectedState
            ? [...practice.question, { id }]
            : practice.question.filter((element) => element.id !== id);
        dispatch(updateQuestion(updatedQuestions));
    };


    const titleStyles = useMemo(() => ({
        '--text-color': color.svgGroupColor,
        '--active-svg-color': color.textColor,
        '--header-svg-color': color.svgGroupColor,
        '--active-background-color': color.svgAvtiveBackgroundColor,
    }), [color]);

    return (
        <div id={id} onClick={click} className={styles.wrap}>
            <div style={titleStyles as React.CSSProperties} className={styles.title}>
                <div className={isSelected ? styles.active : styles.notActive}>{svg}</div>
                <span>{name} ({quantity})</span>
            </div>
            <div className={styles.containerPercent}>
                <CirclePercent currentPercent={percent} />
            </div>
        </div>
    );
};

export default memo(Par);
