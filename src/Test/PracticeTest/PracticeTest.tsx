import styles from './PracticeTest.module.scss';
import FooterTest from '../FooterTest/FooterTest';
import { useEffect, useState } from 'react';
import VariantsOfAnswers from '../VariantsOfAnswers/VariantsOfAnswers';
import QuestionContent from '../QuestionComponent/QuestionContent';
import HeaderForTest from '../HeaderForTest/HeaderForTest';
import Spinner from '../../UI/Spinner/Spinner';
import { RootState } from '../../store/store';
import { shallowEqual, useSelector } from 'react-redux';

interface PracticeTestProps {
  closeTest: (e: boolean) => void;
  result: (e: boolean) => void;
}

export default function PracticeTest({ closeTest, result }: PracticeTestProps) {

  const [exit, setExit] = useState(false);

  const color = useSelector((state: RootState) => state.color);

  const { questions, currentPage, isLoading } = useSelector(
    (state: RootState) => state.currentData.testsData["PracticeTest"],  
    shallowEqual
);


  useEffect(() => {
    closeTest(!exit);
  }, [exit]);

  return (
    <>
      {isLoading ?
       <Spinner color={'blue'} />
      :
      <div 
      style={{
        backgroundColor:color.TestBackground
      }}
      className={styles['wrap']}>
        <div>
          <HeaderForTest
            typeOftest="PracticeTest"
            result={result}
            onExitClick={setExit}
            finish="Results"
          />
          <div
            style={{backgroundColor:color.QuestionContentBackground}}
            className={styles['question-wrap']}
          >
            <QuestionContent 
                typeOftest="PracticeTest" 
                question={questions[currentPage]}/>
          </div>
        </div>
        <div className={styles['container']}>
          <VariantsOfAnswers 
              typeOftest="PracticeTest" 
              question={questions[currentPage]} 
          />
          <FooterTest
            result={result}
            typeOftest="PracticeTest"
          />
        </div>
      </div>
      
      }
    </>
  );
}
