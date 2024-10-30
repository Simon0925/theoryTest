import { useCallback, useMemo, useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './FooterTrainerTest.module.scss';
import Modal from '../Modal/Modal';
import { updateQuestionsAndResults } from '../../service/serviceFooter/updateQuestionsAndResults';
import { setCurrentQuestions, updateCurrentPage, updateResult } from '../../store/currentData/currentData.slice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface FooterTrainerTestProps {
    result:(e:boolean) => void
}

export default function FooterTrainerTest({result}:FooterTrainerTestProps) {

    const  typeOftest = "Trainer"

    const maxPage = 756

    const color = useSelector((state: RootState) => state.color);


    const { questions, currentPage, isLoading, answeredVariants,results} = useSelector(
        (state: RootState) => state.currentData.testsData["Trainer"],  
        shallowEqual
    );
    const [isExplanationVisible, setIsExplanationVisible] = useState(false);

    const dispatch = useDispatch();
    

    const isAnswerSelected = useMemo(() => {
        return answeredVariants.some((e) => questions[currentPage]?.id === e.id);
      }, [answeredVariants, currentPage, questions]);
   
    const changeFlag = useCallback(() => {
        if (!questions[currentPage]) return;
    
        const { updatedQuestions, updatedResults } = updateQuestionsAndResults(questions, results, currentPage);
    
        dispatch(setCurrentQuestions({ testId: typeOftest, questions: updatedQuestions }));
        dispatch(updateResult({ testId: typeOftest, result: updatedResults }));
      }, [currentPage, questions, results, dispatch, typeOftest]);

      const next = useCallback(() => {
        if (currentPage < questions.length - 1) {
          dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage + 1 }));
        } else if (questions.length - 1 === maxPage) {
            result(true);
        }
      }, [currentPage, questions.length, dispatch, typeOftest]);

    const explanationModal = () => {
        setIsExplanationVisible(true)
    };
    
    return(
        <div style={{background:color.headerColors}} className={styles['wrap']}>
            <div className={styles['container']}>
            <ButtonTest
                    click={changeFlag}
                    name={''}
                    color={color.TestcolorText}
                    backgroundColor={color.FooterBackgroundBtn}
                    svg={true}
                    svgColor={questions[currentPage].flag === true && typeof questions[currentPage].flag === 'boolean' ? true : color.FlagColorSvgBtn}
                />
                <ButtonTest
                    click={explanationModal}
                    name={'Explanation'}
                    color={color.TestcolorText}
                    backgroundColor={color.FooterBackgroundBtn}
                    svg={false}
                    svgColor={false}
                />
                <ButtonTest
                    click={next}
                    name={isAnswerSelected ? 'Next >' : 'Skip'}
                    color={isAnswerSelected ?  color.FooterColorNextBtnSelectedOption :color.TestcolorText}
                    backgroundColor={isAnswerSelected ? color.FooterBackgroundNextBtnSelectedOption : color.FooterBackgroundBtn}
                    svg={false}
                    svgColor={false}
                />
            </div>
            {isExplanationVisible === true && (
                        <Modal 
                            close={() => setIsExplanationVisible(false)} 
                            text={questions[currentPage].explanation || ""} 
                            title={'DVSA explanation'} 
                            cancel={false} 
                            blueBtnText={'Ok'} 
                        />
                    )}
        </div>
    )
}