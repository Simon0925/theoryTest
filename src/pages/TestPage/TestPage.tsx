import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './TestPage.module.scss';
import mphZoneSign from '../../imgSigns/mphZoneSign.png';
import VariantsOfAnswers from '../../components/VariantsOfAnswers/VariantsOfAnswers';
import FooterTest from '../../components/FooterTest/FooterTest';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import getData from './service';


interface Answer {
    answer: string;
    tOF: boolean;
}

interface QuestionData {
    id: string;
    queston: string; 
    photo: boolean;
    par: {
        v1: Answer;
        v2: Answer;
        v3: Answer;
        v4: Answer;
    };
}


interface QuestionSet {
    id: string;
    data: QuestionData[];
}


interface Question {
    id: string;
    question: string;
    photo: boolean;
    par: {
        v1: Answer;
        v2: Answer;
        v3: Answer;
        v4: Answer;
    };
}

export default function TestPage() {
    const store = useSelector((state: RootState) => state.practice.question);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(false);
    const [currentQuestions, setCurrentQuestions] = useState<Question | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: QuestionSet[] = await getData();
               
                if (store.length !== 0) {
                    const filteredQuestions: Question[] = [];

                    store.forEach((storeItem) => {
                        const foundQuestionSet = res.find((elem) => elem.id === storeItem.id);
                        if (foundQuestionSet) {
                            foundQuestionSet.data.forEach((elem: QuestionData) => {
                                const question: Question = {
                                    id: elem.id.toString(),
                                    question: elem.queston, 
                                    photo: elem.photo,
                                    par: elem.par,
                                };
                                filteredQuestions.push(question);
                            });
                        }
                    });

                    setQuestions(filteredQuestions);
                }
            } catch (error) {
                console.error('Error fetching data in useEffect:', error);
            }
        };

        fetchData();
    }, [store]);

    useEffect(() => {
        setCurrentQuestions(questions[current]);
    }, [current, questions]);



    return (
        <>
            <div className={styles['wrap']}>
                <div>
                    <div className={styles['title']}>
                        <ButtonTest name={'Exit'} color={'white'} backgroundColor={'#A73530'} svg={false} click={null} />
                        <div className={styles['count-questions']}>
                            <span>Question</span>
                            <span>{current + 1}</span>
                            <span>of</span>
                            <span>{questions.length}</span>
                        </div>
                        <NavLink className={styles['nav']} to='/results'>
                            <ButtonTest name={'Results'} color={'white'} backgroundColor={'#00B06F'} svg={false} click={null} />
                        </NavLink>
                    </div>
                    <div className={styles['question-wrap']}>
                        <span className={styles['question']}>
                            {questions.length > 0 && (
                                <div>{questions[current].question}</div>
                            )}
                        </span>
                        <img className={styles['img']} src={mphZoneSign} alt="MPH Zone Sign" />
                    </div>
                </div>
                <div className={styles['container']}>
                    {currentQuestions && (
                        <VariantsOfAnswers  par={currentQuestions.par} questions={currentQuestions.question} id={currentQuestions.id}/> 
                    )}
                    <FooterTest maxPage={questions.length} currentPage={current} click={setCurrent} selected={selected} />
                </div>
            </div>
        </>
    );
}
