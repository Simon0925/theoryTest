import { useEffect, useState, useMemo, memo } from 'react';
import styles from './Topic.module.scss';
import { CirclePercent } from '../../UI/CirclePercent/CirclePercent';
import { RootState } from '../../store/store';
import { updateTopic } from '../../store/practice/practice.slice';
import { useDispatch, useSelector } from 'react-redux';
import CirclehundredPercents from '../CirclehundredPercents/CirclehundredPercents';
import TopicProps from './interface';


const Topic = ({ name, quantity, percent, svg, id }: TopicProps) => {
    const dispatch = useDispatch();
    
    const practice = useSelector((state: RootState) => state.practice);
    const color = useSelector((state: RootState) => state.color.themeData);

    const [isSelected, setIsSelected] = useState(false);

    const active = useMemo(() => practice.topic.some((element) => element.id === id), [practice.topic, id]);

    useEffect(() => {
        setIsSelected(active);
    }, [active]);

    const click = () => {
        const newSelectedState = !isSelected;
        setIsSelected(newSelectedState);
        const updatedQuestions = newSelectedState
            ? [...practice.topic, { id }]
            : practice.topic.filter((element) => element.id !== id);
        dispatch(updateTopic(updatedQuestions));
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
                
                {percent >= 100?<CirclehundredPercents currentPercent={percent}  /> :<CirclePercent currentPercent={percent} />}
            </div>
        </div>
    );
};

export default memo(Topic);
