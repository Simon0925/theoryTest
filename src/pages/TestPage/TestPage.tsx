import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './TestPage.module.scss';
import VariantsOfAnswers from '../../components/VariantsOfAnswers/VariantsOfAnswers';
import FooterTest from '../../components/FooterTest/FooterTest';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {postQuestionsMDB} from '../../service/service'


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
}

export default function TestPage() {
    const practiceQuestions = useSelector((state: RootState) => state.practice.question);
    const numberOfQuestions = useSelector((state: RootState) => state.practice.numberOfQuestions);
    const questionType = useSelector((state: RootState) => state.practice.type);

    console.log("questionType:",questionType)

    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(false);
    const [currentQuestions, setCurrentQuestions] = useState<Question | undefined>(undefined);


    useEffect(() => {
        const fetchData = async () => {
          try {
           const response =  await postQuestionsMDB({
              type:questionType,
              quantity: numberOfQuestions,
              questions: practiceQuestions,
            });
            localStorage.setItem('result', JSON.stringify([]));
            setQuestions(response);
          } catch (error) {
            console.error('Error posting questions in useEffect:', error);
          }
        };
    
        fetchData();
      }, [practiceQuestions, numberOfQuestions]);



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
                        {currentQuestions && currentQuestions.photo && (
                            <img
                                className={styles['img']}
                                src={`http://localhost:8080${currentQuestions.photo}`}
                                alt="Question Image"
                            />
                        )}
                    </div>
                </div>
                <div className={styles['container']}>
                    {currentQuestions && (
                        <VariantsOfAnswers
                            par={currentQuestions.par}
                            question={currentQuestions.question}
                            id={currentQuestions._id}
                            group={currentQuestions.group}
                        />
                    )}
                    <FooterTest
                        maxPage={questions.length}
                        currentPage={current}
                        click={setCurrent}
                        selected={selected}
                    />
                </div>
            </div>
        </>
    );
}
