import { NavLink } from 'react-router-dom';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import FooterAssessment from '../FooterAssessment/FooterAssessment';
import styles from './Assessment.module.scss';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import service from "../../service/service";
import idUser from "../../config/idUser";
import Spinner from '../../UI/Spinner/Spinner';

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
    flag?: boolean;
    explanation: string;
}

export default function Assessment({ onClose }: AssessmentProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [exit, setExit] = useState(false);
    const [currentQuestions, setCurrentQuestions] = useState<Question | undefined>(undefined);

    const handleExit = () => {
        setExit(!exit);
    };


    const getData = async () => {
        try {
            const data = await service.assessmentData(idUser);
            setQuestions(data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        getData(); 
    }, []); 

    useEffect(() => {
        setCurrentQuestions(questions[current]);
        console.log("currentQuestions:",currentQuestions)
      }, [current, questions]);

    return (
        <div className={styles.wrap}>
            <div className={styles.title}>
                <ButtonTest 
                    name="Exit" 
                    color="white" 
                    backgroundColor="#A73530" 
                    svg={false} 
                    click={handleExit} 
                    svgColor={false} 
                />
                <div className={styles['count-questions']}>
                    <span>Question</span>
                    <span>{current + 1}</span>
                    <span>of</span>
                    <span>{questions.length}</span>
                </div>
                <NavLink className={styles.nav} to="/results">
                    <ButtonTest 
                        name="Review" 
                        color="white" 
                        backgroundColor="#00B06F" 
                        svg={false} 
                        click={null} 
                        svgColor={false} 
                    />
                </NavLink>
            </div>

            <Spinner/>
            
            <FooterAssessment currentPage={current} click={setCurrent} maxPage={questions.length} />
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
        </div>
    );
}
