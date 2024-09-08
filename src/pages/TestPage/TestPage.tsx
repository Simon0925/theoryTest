import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './TestPage.module.scss';
import VariantsOfAnswers from '../../components/VariantsOfAnswers/VariantsOfAnswers';
import FooterTest from '../../components/FooterTest/FooterTest';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

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
  const question = useSelector((state: RootState) => state.practice.currentQuestions);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  
  const [selected, setSelected] = useState(false);

 
  const [explanation,setExplanation] = useState(false);

  const [currentId,setCurrentId] = useState('');

  const [currentQuestions, setCurrentQuestions] = useState<Question | undefined>(undefined);


  const [markers, setMarkers] = useState<boolean[]>([]);

  useEffect(()=>{
    if (questions.length > 0 && questions[current]._id === currentId) {
        setSelected(!selected);
      }
  },[currentId,question,current])

  useEffect(() => {
    setQuestions(question);
    setMarkers(new Array(question.length).fill(false));
  }, [question]);

  useEffect(() => {
    setCurrentQuestions(questions[current]);
  }, [current, questions]);

  const toggleMarker = () => {
    setMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[current] = !newMarkers[current];
      return newMarkers;
    });
  };

  return (
    <>
      <div className={styles['wrap']}>
        <div>
          <div className={styles['title']}>
            <ButtonTest name={'Exit'} color={'white'} backgroundColor={'#A73530'} svg={false} click={null} svgColor={false} />
            <div className={styles['count-questions']}>
              <span>Question</span>
              <span>{current + 1}</span>
              <span>of</span>
              <span>{questions.length}</span>
            </div>
            <NavLink className={styles['nav']} to="/results">
              <ButtonTest name={'Results'} color={'white'} backgroundColor={'#00B06F'} svg={false} click={null} svgColor={false} />
            </NavLink>
          </div>
          <div className={styles['question-wrap']}>
            <span className={styles['question']}>
              <div className={markers[current] ? styles['marker'] : styles['inactive-marker']}></div>
              {questions.length > 0 && <div>{questions[current].question}</div>}
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
              click={setCurrentId}
              par={currentQuestions.par}
              question={currentQuestions.question}
              id={currentQuestions._id}
              group={currentQuestions.group}
            />
          )}
          {
            explanation === true ? <Modal close={setExplanation} text={currentQuestions.explanation} title={'DVSA explanation'} /> : null

          }
          <FooterTest
                      maxPage={questions.length}
                      currentPage={current}
                      click={setCurrent}
                      selected={selected}
                      id={currentQuestions ? currentQuestions._id : ""}
                      modal={setExplanation}            />
        </div>
      </div>
    </>
  );
}
