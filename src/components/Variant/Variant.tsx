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

    const stateColor = useSelector((state: RootState) => state.color);

    const { answeredVariants, questions, currentPage,results,visibleQuestions } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
    );

    const [color, setColor] = useState({ backgroundColor: stateColor.VariantBackground, color: stateColor.VariantTextColor });

    const dispatch = useDispatch();

    const icon = useMemo(() => {
        const checkAnswer = answeredVariants.some(e => questions[currentPage].id === e.id && index === e.index);
        const practiceCheck = answeredVariants.some(e => questions[currentPage].id === e.id);
        if (typeOftest === "MockTest") return correct;
        if (typeOftest === "Trainer") return correct;
        if (checkAnswer || (practice && practiceCheck && typeOftest === "PracticeTest")) return correct ? <OkVectorSvg /> : <CrossSvg />;
        return null;
    }, [answeredVariants, currentPage, practice]);

    const addAnswer = () => {
        const practiceCheck = answeredVariants.some(e =>
            typeOftest === "MockTest"
                ? visibleQuestions?.[currentPage]?.id === e.id
                : questions[currentPage].id === e.id
        );
    
        if (!practiceCheck) {
            const currentQuestionId = typeOftest === "MockTest" && visibleQuestions
            ? visibleQuestions[currentPage]?.id
            : questions[currentPage].id;
    
            dispatch(
                updateAnsweredVariants({
                    testId: typeOftest,
                    answeredVariants: [...answeredVariants, { id: currentQuestionId, index }]
                })
            );
    
            const existingResult = results.find(e => e.id === currentQuestionId);
            const newResult = {
                id: currentQuestionId,
                question: questions[currentPage].question,
                flag: questions[currentPage].flag ?? false,
                group: questions[currentPage].group,
                status: correct
            };
    
            const updatedResults = existingResult
                ? results.map(result =>
                    result.id === currentQuestionId
                        ? { ...result, status: correct }
                        : result
                )
                : [...results, newResult];
    
            dispatch(updateResult({
                testId: typeOftest,
                result: updatedResults
            }));
        }
    
        if (typeOftest === "MockTest") {
            dispatch(
                updateCurrentPage({
                    testId: typeOftest,
                    currentPage: currentPage + 1 < questions.length ? currentPage + 1 : questions.length - 1
                })
            );
        }
    };
    
    


    useEffect(() => {
        const checkAnswer = answeredVariants.some(e => 
            (typeOftest === "MockTest"
                ? visibleQuestions?.[currentPage]?.id === e.id && index === e.index
                : questions[currentPage].id === e.id && index === e.index
            )
        );

        if(checkAnswer && typeOftest === "PracticeTest"  ){
            setColor({
                backgroundColor: correct ? "rgb(0, 182, 118)" : "rgb(170, 59, 54)",
                color: stateColor.VariantSelectedOption 
            })
         }else if(checkAnswer && typeOftest === "MockTest" ){
            setColor({
                backgroundColor: checkAnswer ? stateColor.VariantSelectedMockBackground :stateColor.VariantSelectedMockBackground ,
                color: stateColor.VariantSelectedMockTestOption 
            });
         }else if(checkAnswer && typeOftest === "Trainer" ){
            setColor({
                backgroundColor: correct ? "rgb(0, 182, 118)" : "rgb(170, 59, 54)",
                color: stateColor.VariantSelectedOption 
            })
         }else{
            setColor({
                backgroundColor: stateColor.VariantBackground,
                color: stateColor.TestcolorText
            });
         }
        
    }, [ correct, currentPage,answeredVariants,visibleQuestions,stateColor]);

    return (
        <div onClick={addAnswer} style={{background:color.backgroundColor}} className={styles['wrap']}>
            <span style={{ color:color.color  }}>{answer}</span>
            {photo && <img className={styles['img']} src={`${hostname}${photo}`} alt="Variant" />}
            <div className={styles['box']}>{icon}</div>
        </div>
    );
};

export default React.memo(Variant);
