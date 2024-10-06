import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Assessment.module.scss';
import service from "../../service/service";
import idUser from "../../config/idUser";
import Spinner from '../../UI/Spinner/Spinner';
import HeaderForTest from '../HeaderForTest/HeaderForTest';
import QuestionContent from '../QuestionComponent/QuestionContent';
import VariantsOfAnswers from '../VariantsOfAnswers/VariantsOfAnswers';
import FooterAssessment from '../FooterAssessment/FooterAssessment';
import Modal from '../Modal/Modal';
import ReviewModal from '../ReviewModal/ReviewModal';

interface AssessmentProps {
  onClose: (e: boolean) => void;
}

interface ParData {
  answer: string;
  tOF: boolean;
  photo: string | boolean  ;
}

interface Question {
  _id: string;
  question: string;
  photo?: string ;
  group: string;
  par: ParData[];
  flag: boolean;
  explanation: string;
}

interface AnsweredQuestion {
    id: string;
    answer: boolean;
  }

export default function Assessment({ onClose }: AssessmentProps) {
  const navigate = useNavigate();
  const localS = localStorage.getItem('result');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState<Question[]>([]);
  const [reviewMode, setReviewMode] = useState<'all' | 'unanswered' | 'flagged'>('all');
  const [time, setTime] = useState<number | undefined>();
  const [timesUp, setTimesUp] = useState(false);
  const [pause, setPause] = useState(false); 
  const [currentAll,setCurrentAll] = useState(0)

 

  useEffect(()=>{
        if(reviewMode === "all"){
             setCurrentAll(current)
        }
  },[current])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.assessmentData(idUser);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(()=>{
    const localStore: AnsweredQuestion[] = localS ? JSON.parse(localS) : [];
    
    const answeredQuestion = localStore.filter((q) => q.answer === true);

    if (answeredQuestion.length > 0) {
        const unanswered: Question[] = [];

        questions.forEach((q) => {
          let isAnswered = false;

          answeredQuestion.forEach((element) => {
            if (q._id === element.id) {
              isAnswered = true;
            }
          });

          if (!isAnswered) {
            unanswered.push(q);
          }
        });
        setUnansweredQuestions(unanswered)
        console.log("unanswered:",unanswered.length)
    }
},[localS])


  useEffect(() => {
    switch (reviewMode) {
        case 'unanswered':
            if (questions.length > 0) {    
              if (unansweredQuestions.length > 0) {
                setVisibleQuestions(unansweredQuestions);
                setCurrent(0);
              }else{
                setReviewMode("all");
              }

            }
        break;
      case 'flagged':
        setVisibleQuestions(questions.filter(q => q.flag));
        setCurrent(0);
        break;
      default:
        setVisibleQuestions(questions);
        setCurrent(currentAll);
    }
  }, [reviewMode, questions]);

  useEffect(() => {
    if (time !== undefined && time <= 0) {
      setTimesUp(true);
    }
  }, [time]);

  const handleReviewModeChange = (mode: 'all' | 'unanswered' | 'flagged') => {
    setReviewMode(mode);
    setReviewModal(false);
  };

  const goToResults = () => navigate('/results');

  return (
    <div className={styles.wrap}>
          <div>
      <HeaderForTest
        mockTest={true}
        onExitClick={() => onClose(false)}
        questionCount={visibleQuestions.length}
        currentQuestion={current}
        finish="Review"
        reviewClick={() => setReviewModal(true)}
      />
    
    {pause ? (
        <div className={styles.pausedMessage}>Test paused</div>
      ) : loading ? (
        <div className={styles.spinner}>
          <Spinner color={'black'} />
        </div>
      ) : (
        visibleQuestions[current] &&  (
          <>
              <QuestionContent
              question={visibleQuestions[current].question}
              photo={typeof visibleQuestions[current].photo === 'string' ? visibleQuestions[current].photo : undefined}
              markers={visibleQuestions[current].flag}
            />
            </>
        )
      )}
        </div>
        <div>
        {!pause && visibleQuestions.length > 0 && visibleQuestions[current] && (
            <VariantsOfAnswers
                currentFlag={visibleQuestions[current].flag}
                click={() => {}}
                par={visibleQuestions[current].par}
                question={visibleQuestions[current].question}
                id={visibleQuestions[current]._id}
                group={visibleQuestions[current].group}
                typeOftest={'MockTest'}
                nextPage={setCurrent}
                currentPage={current}
            />
            )}

            <FooterAssessment
            getTime={setTime}
            statusPause={setPause}
            currentPage={current}
            click={setCurrent}
            maxPage={visibleQuestions.length}
            id={visibleQuestions[current]?._id || ""}
            flag={visibleQuestions[current]?.flag || false}
            onFlagChange={() => {}}
            setSelectedAnswer={''}
            />
    </div>
      {timesUp && (
        <Modal
          close={goToResults}
          text={""}
          title={
            <>
              <h1>Time's up!</h1><br />
              Click Go to Results to view your assessment results.
            </>
          }
          cancel={false}
          blueBtnText={'Results'}
        />
      )}

      {reviewModal && (
        <ReviewModal
          setShowFlagged={() => handleReviewModeChange('flagged')}
          cancelClick={setReviewModal}
          questionsUnanswered={unansweredQuestions.length}
          questionsFlagged={questions.filter(q => q.flag).length}
          setShowUnansweredOnly={() => handleReviewModeChange('unanswered')}
          setShowAllOnly={() => handleReviewModeChange('all')}
        />
      )}
    </div>
  );
}
