import { useDispatch, useSelector } from 'react-redux';
import styles from './HeaderCheckResultAnswer.module.scss';
import { RootState } from '../../store/store';
import { isActive, updateCurrentPage } from '../../store/currentData/currentData.slice';
import { useEffect } from 'react';
import {getCurrentPage} from './service/getCurrentPage'



export default function HeaderCheckResultAnswer () {

    const dispatch = useDispatch();

    const color = useSelector((state: RootState) => state.color.themeData);

    const {questions,startId,currentPage}  = useSelector((state: RootState) => state.currentData.testsData["Result"]);

    useEffect(() => {
        if (startId) {
            getCurrentPage({ questions, startId, dispatch });
        }
    }, [questions, startId, dispatch]);
  

    return(
        <div style={{ backgroundColor: color.headerColors }} className={styles.wrap}>
            <button style={{ color: color.FooterTextBtnDesktop,background:color.FooterBackgroundBtnDesktop }}  onClick={()=>dispatch(isActive({resultsAnswers:false}))}>
                Back
            </button>
            <div style={{ color: color.HeaderPracticeTestQuestionColors }}  className={styles.title}>
                Questions {currentPage + 1} of {questions.length}
            </div>
            <span></span>
        </div>
    )
}