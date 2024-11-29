import { useSelector } from 'react-redux';
import HeaderCheckResultAnswer from '../HeaderCheckResultAnswer/HeaderCheckResultAnswer'
import styles from './CheckResultAnswer.module.scss'
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import QuestionWithAnswers from '../QuestionWithAnswers/QuestionWithAnswers';
import PracticeFooter from '../PracticeFooter/PracticeFooter';


export default function CheckResultAnswer () {


    const {questions,startId,currentPage}  = useSelector((state: RootState) => state.currentData.testsData["Result"]);


   

    return(
        <div onClick={()=>''} className={styles.wrap}>
            <HeaderCheckResultAnswer  />
            <QuestionWithAnswers
            typeOftest="Result" 
            question={questions[currentPage]} 
            />
            <PracticeFooter
                result={()=>''}
                typeOftest="Result"
            />
        </div>
    )
}