import FooterAssessment from '../FooterAssessment/FooterAssessment';
import styles from './Assessment.module.scss';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import service from "../../service/service";
import idUser from "../../config/idUser";
import Spinner from '../../UI/Spinner/Spinner';
import HeaderForTest from '../HeaderForTest/HeaderForTest';
import QuestionContent from '../QuestionContent/QuestionContent';
import VariantsOfAnswersTestV from '../VariantsOfAnswersTestV/VariantsOfAnswersTestV';
import { useNavigate } from 'react-router-dom';

interface AssessmentProps {
    onClose: () => void; 
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

    const [time,setTime] = useState<number | undefined>();

    const [timesUp, setTimesUp] = useState(false)

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
        console.log("currentId:",currentId)
    }, [currentId]);
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
        setExit(!exit);
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
                exitLabel="Exit"
                exitColor="white"
                exitBackgroundColor="#A73530"
                onExitClick={handleExit}
                questionCount={questions.length}
                currentQuestion={current}
                reviewLabel="Review"
                reviewColor="white"
                reviewBackgroundColor="#00B06F"
                reviewLink="/results"
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
                        <VariantsOfAnswersTestV
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
            {exit && (
                <Modal 
                    close={onClose} 
                    text={""} 
                    title="Are you sure you want to exit from the test?" 
                    cancelClick={() => setExit(!exit)} 
                    cancel={true} 
                    blueBtnText={'Exit test'} 
                />
            )}
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
        </div>
    );
}
