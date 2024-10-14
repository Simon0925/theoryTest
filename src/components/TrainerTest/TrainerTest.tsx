import { useEffect, useState } from "react";
import HeaderForTest from "../HeaderForTest/HeaderForTest";
import QuestionContent from "../QuestionComponent/QuestionContent";
import styles from "./TrainerTest.module.scss";
import VariantsOfAnswers from "../VariantsOfAnswers/VariantsOfAnswers";
import Modal from "../Modal/Modal";
import FooterTrainerTest from "../FooterTrainerTest/FooterTrainerTest";

interface ParData {
    answer: string;
    tOF: boolean;
    photo: string | boolean;
}

interface Question {
    id: string;
    question: string;
    photo: string | boolean;
    group: string;
    par: ParData[];
    flag: boolean | undefined;
    explanation: string;
}

interface TrainerTestProps {
    onExitClick: (e: boolean) => void;
    data: Question[]; 
    result:(e:boolean) => void
}

export default function TrainerTest({ onExitClick, data,result }: TrainerTestProps) {
    const [currentQuestions, setCurrentQuestions] = useState<Question | null>(null);  
    const [markers, setMarkers] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [questionsSelected, setQuestionsSelected] = useState<{ id: string, index: number }[]>([]);
    const [isExplanationVisible, setIsExplanationVisible] = useState(false);
    const [currentPage ,setCurrentPage] = useState(0)
    const [isAnswerSelected, setIsAnswerSelected] = useState(false); 
    const [changeFlag,setChangeFlag] = useState(false)

    useEffect(()=>{
        setCurrentQuestions(prev => {
            if (!prev) return null;
    
            const updatedQuestions = [...data]; 
            updatedQuestions[currentPage] = {
                ...updatedQuestions[currentPage], 
                flag: changeFlag, 
            };
    
            return updatedQuestions[currentPage]; 
        });
    },[changeFlag])

    useEffect(() => {
        const selected = questionsSelected.some(e=> e.id === currentId)
        setIsAnswerSelected(selected)
    },[questionsSelected]);

    useEffect(() => {
        setCurrentQuestions(data[currentPage]);
    }, [data,currentPage]);

    return (
        <>
            <div className={styles.wrap}>
            <div>
                <HeaderForTest finish="Results" onExitClick={onExitClick} questionCount={data.length} currentQuestion={0} trainerTest={true}result={result}/>
                <div className={styles['question-wrap']}>
                    {
                    currentQuestions && (
                        <QuestionContent
                            question={currentQuestions.question}
                            photo={typeof currentQuestions.photo === 'string' ? currentQuestions.photo : undefined}
                            markers={currentQuestions.flag ?? false}  
                        />
                    )
                    }
                </div>
            </div>
            <div className={styles['container']}>
                {currentQuestions && (
                    <VariantsOfAnswers
                        currentFlag={markers}
                        click={setCurrentId}
                        par={currentQuestions.par}
                        question={currentQuestions.question}
                        id={currentQuestions.id}
                        group={currentQuestions.group}
                        typeOftest={''}
                        nextPage={null}  
                        currentPage={null}
                        setQuestionsSelected={setQuestionsSelected}
                    />
                )}
                {isExplanationVisible === true && (
                    <Modal 
                        close={() => setIsExplanationVisible(false)} 
                        text={currentQuestions?.explanation || ""} 
                        title={'DVSA explanation'} 
                        cancel={false} 
                        blueBtnText={'Ok'} 
                    />
                )}
                <FooterTrainerTest
                        changeFlag={setChangeFlag}
                        nextPage={setCurrentPage}
                        explanation={setIsExplanationVisible}
                        currentPage={currentPage}
                        id={currentQuestions?.id ?? ''}
                        flag={currentQuestions?.flag ?? false} 
                        isAnswerSelected={isAnswerSelected}                />
            </div>
            </div>
        </>
    );
}
