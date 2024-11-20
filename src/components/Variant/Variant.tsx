import React, { useEffect, useMemo, useRef, useState } from 'react';
import CrossSvg from '../../SVG/CrossSvg/CrossSvg';
import OkVectorSvg from '../../SVG/OkVectorSvg/OkVectorSvg';
import styles from './Variant.module.scss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { VariantProps } from "./interface";
import hostname from '../../config/hostname';
import { addAnswer as handleAnswer } from './service/addAnswer';

import getVariantColor from './service/getVariantColor'
import Loader from '../../UI/Loader/Loader';

const Variant: React.FC<VariantProps> = ({ answer, photo, typeOftest, index, correct }) => {
    const practiceCorrect = useSelector((state: RootState) => state.practice.correct);
    const stateColor = useSelector((state: RootState) => state.color);
    const [loaded, setLoaded] = useState(false); 
    const imageRef = useRef<HTMLImageElement | null>(null);

    const { answeredVariants, questions, currentPage, results, visibleQuestions } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
    );

    const [color, setColor] = useState({
        backgroundColor: stateColor.VariantBackground,
        color: stateColor.VariantTextColor,
    });

    useEffect(() => {
        if (imageRef.current && photo) {
            setLoaded(false); 
            imageRef.current.onload = () => setLoaded(true);
            imageRef.current.onerror = () => setLoaded(true); 
        }
    }, [photo]);

    const dispatch = useDispatch();

    const icon = useMemo(() => {
        const checkAnswer = answeredVariants.some(e => questions[currentPage].id === e.id && index === e.index);
        const practiceCheck = answeredVariants.some(e => questions[currentPage].id === e.id);

        if (typeOftest === "MockTest" || typeOftest === "Trainer") {
            return correct;
        }
        if (checkAnswer || (practiceCorrect && practiceCheck && typeOftest === "PracticeTest")) {
            return correct ? <OkVectorSvg /> : <CrossSvg />;
        }
        return null;
    }, [answeredVariants, currentPage, practiceCorrect]);

    const addAnswer = () => {
        handleAnswer(
            answeredVariants,
            typeOftest,
            visibleQuestions,
            currentPage,
            correct,
            questions,
            results,
            dispatch,
            practiceCorrect,
            index
        );
    };

    useEffect(() => {
        const color = getVariantColor(
            answeredVariants,
            visibleQuestions,
            currentPage,
            typeOftest,
            index,
            questions,
            correct,
            stateColor,
            practiceCorrect
        );
        setColor(color);
    }, [correct, currentPage, answeredVariants, visibleQuestions, stateColor]);

    useEffect(()=>{
        console.log("visibleQuestions:",visibleQuestions)
    },[visibleQuestions])

    return (
        <div onClick={addAnswer} style={{ background: color.backgroundColor }} className={styles['wrap']}>
            <span style={{ color: color.color }}>{answer}</span>
            {!loaded && photo && <div className={styles.loader}><Loader /></div>}
            {photo && <img ref={imageRef}  loading="lazy" className={styles['img']} src={`${hostname}${photo}`} alt="Variant" />}
            <div className={styles['box']}>{icon}</div>
        </div>
    );
};

export default React.memo(Variant);
