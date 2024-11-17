import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Assessment.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import HeaderForTest from '../HeaderForTest/HeaderForTest';
import FooterAssessment from '../FooterAssessment/FooterAssessment';
import Modal from '../Modal/Modal';
import ReviewModal from '../ReviewModal/ReviewModal';
import { getUnansweredQuestions } from './service/getUnansweredQuestions';
import { RootState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setTestInactive, updateCurrentPage, updatevisibleQuestions } from '../../store/currentData/currentData.slice';

import  {assessmentData}from './service/assessmentData';
import useUserId from '../../hooks/useUserId';
import QuestionWithAnswers from '../QuestionWithAnswers/QuestionWithAnswers';
import PauseSvg from '../../SVG/PauseSvg/PauseSvg';
import ReactDOM from "react-dom";



interface AssessmentProps {
  onClose: (e: boolean) => void;
  result: (e: boolean) => void;
  getTime: (e: number | undefined) => void;
}

export interface Question {
  correctAnswers: number;
  explanation: string;
  flag: boolean ;
  group: string;
  id: string;
  incorrectAnswers: number;
  par: ParData[];
  photo: boolean | string;
  question: string;
  status: boolean | string;
}

interface ParData {
  answer: string;
  tOF: boolean;
  photo: string | boolean;
}

export default function Assessment({ onClose, result, getTime }: AssessmentProps) {
  const typeOftest = 'MockTest';
  const dispatch = useDispatch();
  const color = useSelector((state: RootState) => state.color);

  const modalRoot = document.getElementById("modal-root");


  const [reviewModal, setReviewModal] = useState(false);
  const [reviewMode, setReviewMode] = useState<'all' | 'unanswered' | 'flagged'>('all');
  const [time, setTime] = useState<number | undefined>();
  const [timesUp, setTimesUp] = useState(false);
  const [pause, setPause] = useState(false);

  const [currentAll,setCurrentAll] = useState(0)

  const userId = useUserId();


  const {
    questions,
    currentPage,
    answeredVariants,
    visibleQuestions,
    isLoading
  } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );


  const fetchAssessmentData = useCallback(() => {
    if(userId){
      if (questions.length <= 0) {
        assessmentData(dispatch,userId);
      }
    }
  }, [questions.length]);

  useEffect(() => {
    fetchAssessmentData();
  }, []);

 
  const unansweredQuestions = useMemo(() => {
    return getUnansweredQuestions(answeredVariants, questions);
  }, [answeredVariants, questions]);



  useEffect(() => {
    if(currentPage>currentAll && reviewMode === 'all')setCurrentAll(currentPage)
  },[currentPage])

  
  useEffect(() => {
    let visibleQuestions;
    if (reviewMode === 'unanswered') {
      visibleQuestions = unansweredQuestions.length > 0 ? unansweredQuestions : questions;
    } else if (reviewMode === 'flagged') {
      visibleQuestions = questions.filter(q => q.flag);
    } else {
      visibleQuestions = questions;
    }

    dispatch(updatevisibleQuestions({ testId: typeOftest, visibleQuestions }));
    dispatch(updateCurrentPage({ testId: typeOftest, currentPage: reviewMode === 'all' ? currentAll : 0 }));

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
  },[questions])

  return (
    <div
      style={ {background:color.TestBackground}}
     className={styles.wrap}
     >
      {isLoading && (visibleQuestions?.length ?? 0) <= 0 ? (
        <div className={styles.spinner} style={{ position: 'absolute', top: '40%' }}>
          <Spinner color="white" />
        </div>
      ) : (
        <>
            <HeaderForTest
              mockTest={true}
              onExitClick={() => onClose(false)}
              finish="Review"
              reviewClick={() => setReviewModal(true)}
              typeOftest={typeOftest}
            />
            {!pause && visibleQuestions ? (
              <QuestionWithAnswers
              typeOftest={typeOftest}
              question={visibleQuestions[currentPage]}
            />
             
            ) : (
              <div style={{ color:color.textColor }}className={styles.pausedMessage}>
                Test paused
                <PauseSvg color={color.textColor} />
              </div>
            )}
      
            <FooterAssessment
              review={setReviewModal}
              getTime={setTime}
              statusPause={setPause}
              typeOftest={typeOftest}
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
