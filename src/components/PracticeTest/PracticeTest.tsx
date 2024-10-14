import styles from './PracticeTest.module.scss';
import FooterTest from '../FooterTest/FooterTest';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import VariantsOfAnswers from '../VariantsOfAnswers/VariantsOfAnswers';
import QuestionContent from '../QuestionComponent/QuestionContent';
import HeaderForTest from '../HeaderForTest/HeaderForTest';

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
  flag: boolean | undefined;
  explanation: string;
}

interface PracticeTestProps {
  closeTest:(e:boolean)=>void
  result:(e:boolean)=>void
}

export default function PracticeTest({closeTest,result}:PracticeTestProps) {

  const question = useSelector((state: RootState) => state.practice.currentQuestions, shallowEqual);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(false);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [currentId, setCurrentId] = useState(''); 
  const [currentQuestions, setCurrentQuestions] = useState<Question | undefined>(undefined);
  const [markers, setMarkers] = useState(false);
  const [questionsSelected, setQuestionsSelected] = useState<{ id: string, index: number }[]>([]);
  const [exit, setExit] = useState(false);

  useEffect(()=>{
    closeTest(!exit)
  },[exit])


  useEffect(() => {
    const updatedQuestions = question.map((q: any) => ({
      ...q,
      flag: q.flag ?? false, 
      explanation: q.explanation ?? "",
    }));

    setQuestions(updatedQuestions);
  }, [question]);

  useEffect(() => {
    if (questions.length > 0 && questions[current]._id === currentId) {
      setSelected(!selected);
    }
  }, [currentId, questions, current]);

  useEffect(() => {
    setCurrentQuestions(questions[current]);
  }, [current, questions]);

  useEffect(() => {
    if (currentQuestions) {
      const flag = currentQuestions.flag ?? false; 
      setMarkers(flag);
    }
  }, [currentQuestions]);



  return (
    <>
      <div className={styles['wrap']}>
        <div>
        <HeaderForTest
          result={result}
          onExitClick={setExit}
          questionCount={questions.length}
          currentQuestion={current}
          finish="Results" 
        />
          <div className={styles['question-wrap']}>
            {
            currentQuestions && currentQuestions._id && (
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
            id={currentQuestions._id}
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

          <FooterTest
            result={result}
            maxPage={questions.length}
            currentPage={current}
            click={setCurrent}
            setSelectedAnswer={questionsSelected}
            id={currentQuestions ? currentQuestions._id : ""}
            modal={setIsExplanationVisible}
            flag={markers}
          />
        </div>
      </div>
    </>
  );
}
