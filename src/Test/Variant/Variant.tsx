import React, { useEffect, useMemo, useState } from 'react';
import CrossSvg from '../../SVG/CrossSvg/CrossSvg';
import OkVectorSvg from '../../SVG/OkVectorSvg/OkVectorSvg';
import styles from './Variant.module.scss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { VariantProps } from "./interface";
import hostname from '../../config/hostname';
import { updateAnsweredVariants,updateResult,updateCurrentPage } from '../../store/currentData/currentData.slice';

const Variant: React.FC<VariantProps> = ({ answer, photo, typeOftest, index, correct }) => {

    const practice = useSelector((state: RootState) => state.practice.correct);

    const { answeredVariants, questions, currentPage,results } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
    );

    const [color, setColor] = useState({ backgroundColor: "white", color: "rgb(0, 120, 171)" });
    const dispatch = useDispatch();

  
    const icon = useMemo(() => {
        const checkAnswer = answeredVariants.some(e => questions[currentPage].id === e.id && index === e.index);
        const practiceCheck = answeredVariants.some(e => questions[currentPage].id === e.id);
        if (typeOftest === "MockTest") return correct;
        if (checkAnswer || (practice && practiceCheck && typeOftest === "PracticeTest")) return correct ? <OkVectorSvg /> : <CrossSvg />;
        return null;
    }, [answeredVariants, currentPage, practice]);

    const addAnswer = () => {

        const practiceCheck = answeredVariants.some(e => questions[currentPage].id === e.id);
        if (!practiceCheck) {
            dispatch(updateAnsweredVariants({
                testId: typeOftest,  
                answeredVariants: [...answeredVariants, { id: questions[currentPage].id, index }]
            }));

            const existingResult = results.find(e => questions[currentPage].id === e.id);

            const updatedResults = existingResult
                ? results.map(result =>
                    result.id === questions[currentPage].id
                        ? { ...result, status: correct } 
                        : result
                )
                : [...results, { 
                    id: questions[currentPage].id,
                    question: questions[currentPage].question, 
                    flag: questions[currentPage].flag ?? false,
                    group: questions[currentPage].group, 
                    status: correct 
                }];

            dispatch(updateResult({
                testId: typeOftest,
                result: updatedResults
            }));
        }

        if(typeOftest === "MockTest")dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage + 1 }));
    };

    useEffect(() => {
        const checkAnswer = answeredVariants.some(e => questions[currentPage].id === e.id && index === e.index);
        if(checkAnswer && typeOftest === "PracticeTest"){
            setColor({
                backgroundColor: correct ? "rgb(0, 182, 118)" : "rgb(170, 59, 54)",color: "white"
            })
         }else if(checkAnswer && typeOftest === "MockTest"){
            setColor({
                backgroundColor: "#FFEC4B",
                color: "rgb(0, 120, 171)"
            });
         }else{
            setColor({
                backgroundColor: "white",
                color: "rgb(0, 120, 171)"
            });
         }
           
        
    }, [ correct, currentPage,answeredVariants]);

    return (
        <div onClick={addAnswer} style={color} className={styles['wrap']}>
            <span style={{ color: color.color }}>{answer}</span>
            {photo && <img className={styles['img']} src={`${hostname}${photo}`} alt="Variant" />}
            <div className={styles['box']}>{icon}</div>
        </div>
    );
};

export default React.memo(Variant);
