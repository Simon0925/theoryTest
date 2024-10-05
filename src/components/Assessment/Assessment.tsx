import FooterAssessment from '../FooterAssessment/FooterAssessment';
import styles from './Assessment.module.scss';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import service from "../../service/service";
import idUser from "../../config/idUser";
import Spinner from '../../UI/Spinner/Spinner';
import HeaderForTest from '../HeaderForTest/HeaderForTest';
import QuestionContent from '../QuestionComponent/QuestionContent'
import VariantsOfAnswers from '../VariantsOfAnswers/VariantsOfAnswers';
import { useNavigate } from 'react-router-dom';
import ReviewModal from '../ReviewModal/ReviewModal';

interface AssessmentProps {
    onClose: (e:boolean) => void; 
}

interface ParData {
    answer: string;
    tOF: boolean;
    photo: string | boolean;
}

interface Question {
    _id: string;
    question: string;
    photo: string | boolean;
    group: string;
    par: ParData[];
    flag: boolean;
    explanation: string;
}

export default function Assessment({ onClose }: AssessmentProps) {
    const navigate = useNavigate(); 
    const localS = localStorage.getItem('result')
    
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [exit, setExit] = useState(false);
    const [currentQuestions, setCurrentQuestions] = useState<Question | undefined>(undefined);
    const [markers, setMarkers] = useState(false);
    const [currentId, setCurrentId] = useState(''); 
    const [loading, setLoading] = useState(true);
    const [pause, setPause] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
    
    const [reviewUnanswered,setReviewUnanswered] = useState(false)

    const [unanswered, setUnanswered] = useState(50)

    const [reviewModal, setReviewModal] = useState(false)

    const [time,setTime] = useState<number | undefined>();

    const [timesUp, setTimesUp] = useState(false)

    useEffect(() => {
        if (questions.length > 0 && localS) {
            const localStore = JSON.parse(localS);
            const answeredQuestionIds = new Set(localStore.map((item: any) => item.id)); 
            const answeredQuestionsCount = questions.filter(q => answeredQuestionIds.has(q._id));
            setAnsweredQuestions(answeredQuestionsCount)
            setUnanswered(questions.length - answeredQuestionsCount.length); 
        }
    }, [questions, localS]);

    useEffect(()=>{
        if(reviewUnanswered ){
            console.log("reviewUnanswered:",answeredQuestions)
            setReviewModal(false)
            setReviewUnanswered(false)
        }
    },[reviewUnanswered])

    useEffect(() => {
        if (time !== undefined && time <= 0) {
            setTimesUp(!timesUp);
        }
    }, [time]);

    const goToResults = () => {
        navigate('/results'); 
    };

    const getData = async () => {
        
        try {
            const data = await service.assessmentData(idUser);
            setQuestions(data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);  
        }
    };

    useEffect(() => {
        getData();
    }, []);

   
    useEffect(() => {
        if (localS) {
            let data = JSON.parse(localS); 
    
            const updatedQuestions = questions.map(q => {
                const found = data.find((e: any) => e._id === q._id);  
                if (found && found.flag !== q.flag) {
                    return { ...q, flag: found.flag };
                }
                return q;
            });
    
            setQuestions(updatedQuestions); 
        }
    }, [localS]);


    const handleFlagUpdate = (id: string, newFlag: boolean) => {
        const updatedQuestions = questions.map((q) =>
            q._id === id ? { ...q, flag: newFlag } : q
        );
        setQuestions(updatedQuestions); 

        const localSData = JSON.parse(localStorage.getItem('result') || '[]');
        const updatedLocalSData = localSData.map((e: any) =>
            e._id === id ? { ...e, flag: newFlag } : e
        );
        localStorage.setItem('result', JSON.stringify(updatedLocalSData));
    };

    const handleExit = () => {
        onClose(!exit);
    };

 
    useEffect(() => {
        if (questions.length > 0) {
            setCurrentQuestions(questions[current]);
        }
    }, [current, questions]);

    return (
        <div className={styles.wrap}>
            <div>
            <HeaderForTest
                    mockTest={true}
                    onExitClick={handleExit}
                    questionCount={questions.length}
                    currentQuestion={current}
                    finish="Review"
                    reviewClick={setReviewModal}
             />
            {pause ? (
                <div className={styles.pausedMessage}>Test paused</div>
            ) : (
                <>
                    {loading ? (
                        <div className={styles.spiner}>
                            <Spinner color={'black'} />
                        </div>
                    ) : (
                        currentQuestions && currentQuestions._id && (
                            <QuestionContent
                                question={currentQuestions.question}
                                photo={typeof currentQuestions.photo === 'string' ? currentQuestions.photo : undefined}
                                markers={currentQuestions.flag}  
                            />
                        )
                    )}
                </>
            )}
             </div>
            <div>
            {!pause && (
                <div className={styles.container}>
                    {!loading && currentQuestions && currentQuestions._id && (
                        <VariantsOfAnswers
                        currentFlag={markers}
                        click={setCurrentId}
                        par={currentQuestions.par}
                        question={currentQuestions.question}
                        id={currentQuestions._id}
                        group={currentQuestions.group}
                        typeOftest={'MockTest'} 
                        nextPage={setCurrent}   
                        currentPage={current} 
                    />
                    
                    )}
                </div>
            )}

            <FooterAssessment
                getTime={setTime}
                statusPause={setPause}
                currentPage={current}
                click={setCurrent}
                maxPage={questions.length}
                setSelectedAnswer={currentId}
                id={currentQuestions ? currentQuestions._id : ""}
                flag={currentQuestions ? currentQuestions.flag : false}
                onFlagChange={handleFlagUpdate}  
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
                    reviewUnanswered={setReviewUnanswered}
                    cancelClick={(e) => setReviewModal(e)} 
                    questionsUnanswered={unanswered} 
                    questionsFlagged={0}           
                />
            )}
            
        </div>
    );
}
