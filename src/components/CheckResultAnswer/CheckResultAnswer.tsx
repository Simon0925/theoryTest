import { useDispatch, useSelector } from 'react-redux';
import HeaderCheckResultAnswer from '../HeaderCheckResultAnswer/HeaderCheckResultAnswer'
import styles from './CheckResultAnswer.module.scss'
import { RootState } from '../../store/store';
import QuestionWithAnswers from '../QuestionWithAnswers/QuestionWithAnswers';
import PracticeFooter from '../PracticeFooter/PracticeFooter';
import { useEffect, useState } from 'react';
import { isActive } from '../../store/currentData/currentData.slice';


export default function CheckResultAnswer () {

    const dispatch = useDispatch()

    const {questions,currentPage}  = useSelector((state: RootState) => state.currentData.testsData["Result"]);

    const [isBack,setIsBack] = useState(false)
    

    useEffect(()=>{
        dispatch(isActive({resultsAnswers:!isBack}))
    },[isBack])

    return(
        <div onClick={()=>''} className={styles.wrap}>
            <HeaderCheckResultAnswer  />
            <QuestionWithAnswers
            typeOftest="Result" 
            question={questions[currentPage]} 
            />
            <PracticeFooter
                result={setIsBack}
                typeOftest="Result"
            />
        </div>
    )
}