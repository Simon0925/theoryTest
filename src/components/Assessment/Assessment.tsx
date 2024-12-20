import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Assessment.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import HeaderForTest from '../HeaderForTest/HeaderForTest';
import FooterAssessment from '../FooterAssessment/FooterAssessment';
import Modal from '../Modal/Modal';
import ReviewModal from '../ReviewModal/ReviewModal';
import { getUnansweredQuestions } from './services/getUnansweredQuestions';
import { RootState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setTestInactive } from '../../store/currentData/currentData.slice';
import  {assessmentData}from './services/assessmentData';
import QuestionWithAnswers from '../QuestionWithAnswers/QuestionWithAnswers';
import PauseSvg from '../../SVG/PauseSvg/PauseSvg';
import ReactDOM from "react-dom";
import useCookie from '../../hooks/useCookie';
import {AssessmentProps} from './interface'
import { updateVisibleQuestionsAndPage } from './services/updateVisibleQuestionsAndPage';



export default function Assessment({ onClose, result, getTime }: AssessmentProps) {
  const typeOftest = 'MockTest';
  const dispatch = useDispatch();
  const {TestBackground,textColor} = useSelector((state: RootState) => state.color.themeData);

  const modalRoot = document.getElementById("modal-root");

  const accessToken = useCookie('accessToken');

  const [reviewModal, setReviewModal] = useState(false);
  const [reviewMode, setReviewMode] = useState<'all' | 'unanswered' | 'flagged'>('all');
  const [time, setTime] = useState<number | undefined>();
  const [timesUp, setTimesUp] = useState(false);
  const [pause, setPause] = useState(false);

  const [currentAll,setCurrentAll] = useState(0)

  const {
    questions,
    currentPage,
    visibleQuestions,
    isLoading
  } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );
  
  const answeredVariants = useSelector((state: RootState) => state.currentData.testsData["Result"].answeredVariants || []);


  const fetchAssessmentData = useCallback((accessToken:string) => {
      if (questions.length <= 0) {
        assessmentData(dispatch,accessToken);
      }
  }, [dispatch]);

  useEffect(() => {
    if(accessToken){
      fetchAssessmentData(accessToken);
    }
  }, [accessToken,fetchAssessmentData]);

 
  const unansweredQuestions = useMemo(() => {
    return getUnansweredQuestions(answeredVariants, questions);
  }, [answeredVariants, questions]);


  useEffect(() => {
    if(currentPage>currentAll && reviewMode === 'all')setCurrentAll(currentPage)
  },[currentPage])

  
  useEffect(() => {
    updateVisibleQuestionsAndPage(reviewMode, unansweredQuestions, questions, currentAll, dispatch, typeOftest);
  }, [reviewMode, unansweredQuestions, questions, currentAll, dispatch]);

  useEffect(() => {
    if (time !== undefined) {
      if (time <= 0) setTimesUp(true);
      getTime(time);
    }
  }, [time, getTime]);

  const handleReviewModeChange = useCallback((mode: 'all' | 'unanswered' | 'flagged') => {
    setReviewMode(mode);
    setReviewModal(false);
  }, []);

  const goToResults = useCallback(() => result(true), [result]);

  useEffect(()=>{
    if(questions.length > 0){
      dispatch(setTestInactive(true))
    }
  },[questions,dispatch])



  return (
    <div
      style={ {background:TestBackground}}
     className={styles.wrap}
     >
      {isLoading && (visibleQuestions?.length ?? 0) <= 0 ? (
        <div className={styles.spinner} style={{ position: 'absolute', top: '40%' }}>
          <Spinner />
        </div>
      ) : (
        <>
            <HeaderForTest
              onExitClick={() => onClose(false)}
              finish="Review"
              result={() => setReviewModal(true)}
              typeOftest={typeOftest}
            />
            {!pause && visibleQuestions.length > 0 ? (
              <QuestionWithAnswers
              typeOftest={typeOftest}
              question={visibleQuestions[currentPage]}
            />
             
            ) : (
              <div style={{ color:textColor }}className={styles.pausedMessage}>
                Test paused
                <PauseSvg color={textColor} width={'30px'} height={'30px'} />
              </div>
            )}
      
            <FooterAssessment
              getTime={setTime}
              statusPause={setPause}
              typeOftest={typeOftest}
              setReviewModal={setReviewModal}
            />
          
        </>
      )}

      {timesUp && (
        <Modal
          close={goToResults}
          text=""
          title={
            <>
              <h1>Time's up!</h1>
              <br />
              Click Go to Results to view your assessment results.
            </>
          }
          cancel={false}
          blueBtnText="Results"
        />
      )}

      {reviewModal && modalRoot &&(
        ReactDOM.createPortal(
        <ReviewModal
          setShowFlagged={() => handleReviewModeChange('flagged')}
          cancelClick={setReviewModal}
          questionsUnanswered={unansweredQuestions.length || questions.length}
          questionsFlagged={visibleQuestions ? visibleQuestions.filter(q => q.flag).length : 0}
          setShowUnansweredOnly={() => handleReviewModeChange('unanswered')}
          setShowAllOnly={() => handleReviewModeChange('all')}
          results={result}
        />,modalRoot
      ))}
    </div>
  );
}
