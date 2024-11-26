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


const Variant: React.FC<VariantProps> = ({ answer, photo, typeOftest, index, correct }) => {
    const practiceCorrect = useSelector((state: RootState) => state.practice.correct);
    const themeData = useSelector((state: RootState) => state.color.themeData);

    const { answeredVariants, questions, currentPage, results, visibleQuestions } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
    );
    

    const [color, setColor] = useState({
        backgroundColor: themeData.VariantBackground,
        color: themeData.VariantTextColor,
    });


    const dispatch = useDispatch();

    const isAnswerSelected = useIsAnswerSelected(typeOftest);

    const icon = useMemo(() => {
    
        if (typeOftest === "MockTest" || typeOftest === "Trainer") {
            return correct;
        }else if ((practiceCorrect && isAnswerSelected && typeOftest === "PracticeTest")) {
            return correct ? <OkVectorSvg /> : <CrossSvg />;
        }else if ( (!practiceCorrect && isAnswerSelected && typeOftest === "PracticeTest")) {
            return correct;
        }
        return null;
    }, [ currentPage,answeredVariants]);

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
            themeData as unknown as CoolorState, 
            practiceCorrect
        );
        setColor(color);
    }, [currentPage,answeredVariants,visibleQuestions,themeData]);


    return (
        <div onClick={addAnswer} style={{ background: color.backgroundColor }} className={styles['wrap']}>
            <span style={{ color: color.color }}>{answer}</span>
            {photo &&
                <div className={styles.img}>
                    <ImageComponent
                        maxWidth='150px'
                        maxHeight='65px'
                        src={`${hostname}${photo}`}
                        alt={'Variant'} 
                        
                        />
                        
                </div>
            }
            <div className={styles['box']}>{icon}</div>
        </div>
    );
};

export default React.memo(Variant);
