import React, { useEffect, useMemo,  useState } from 'react';
import CrossSvg from '../../SVG/CrossSvg/CrossSvg';
import OkVectorSvg from '../../SVG/OkVectorSvg/OkVectorSvg';
import styles from './Variant.module.scss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { VariantProps } from "./interface";
import hostname from '../../config/hostname';
import { addAnswer as handleAnswer } from './services/addAnswer';
import getVariantColor from './services/getVariantColor'
import {CoolorState} from './interface'
import { useIsAnswerSelected } from '../../hooks/useIsAnswerSelected';
import ImageComponent from '../ImageComponent/ImageComponent';

///TODO make better


const Variant: React.FC<VariantProps> = ({ answer, photo, typeOftest, index, correct }) => {
    const practiceCorrect = useSelector((state: RootState) => state.practice.correct);
    const themeData = useSelector((state: RootState) => state.color.themeData);

    const { questions, currentPage } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
    );

    const visibleQuestions = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest].visibleQuestions || [],
        shallowEqual
    );

    const answeredVariants = useSelector(
        (state: RootState) => state.currentData.testsData["Result"].answeredVariants || [],
        shallowEqual
    );

    const results = useSelector(
        (state: RootState) => state.currentData.testsData["Result"].questions,
        shallowEqual
    );

    const dispatch = useDispatch();
    const isAnswerSelected = useIsAnswerSelected(typeOftest);

    const memoizedColor = useMemo(() => {
        return getVariantColor(
            answeredVariants,
            visibleQuestions,
            currentPage,
            typeOftest,
            index,
            questions,
            correct,
            themeData as unknown as CoolorState, 
            practiceCorrect
        );
    }, [answeredVariants, visibleQuestions, currentPage, typeOftest, index, correct, questions, themeData, practiceCorrect]);

    const [color, setColor] = useState(memoizedColor);

    useEffect(() => {
        setColor(memoizedColor);
    }, [memoizedColor]);

    const icon = useMemo(() => {
        if (typeOftest === "PracticeTest" && practiceCorrect&& isAnswerSelected) {
            return correct ? <OkVectorSvg /> : <CrossSvg />;
        }
        if (typeOftest === "Result") {
            return correct ? <OkVectorSvg /> : <CrossSvg />;
        }
        return null;
    }, [typeOftest, correct, isAnswerSelected]);

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

    return (
        <div onClick={typeOftest !== "Result" ?addAnswer : ()=>null} style={{ background: color.backgroundColor }} className={styles['wrap']}>
            <span style={{ color: color.color }}>{answer}</span>
            {photo && (
                <div className={styles.img}>
                    <ImageComponent maxWidth="150px" maxHeight="65px" src={`${hostname}${photo}`} alt="Variant" />
                </div>
            )}
            <div className={styles['box']}>{icon}</div>
        </div>
    );
};

export default React.memo(Variant);
