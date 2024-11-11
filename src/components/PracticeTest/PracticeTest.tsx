import styles from './PracticeTest.module.scss';
import FooterTest from '../FooterTest/FooterTest';
import { useEffect, useState } from 'react';
import HeaderForTest from '../HeaderForTest/HeaderForTest';
import Spinner from '../../UI/Spinner/Spinner';
import { RootState } from '../../store/store';
import { shallowEqual, useSelector } from 'react-redux';
import QuestionWithAnswers from '../QuestionWithAnswers/QuestionWithAnswers';

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
          <HeaderForTest
            typeOftest="PracticeTest"
            result={result}
            onExitClick={setExit}
            finish="Results"
          />
        <QuestionWithAnswers
          typeOftest="PracticeTest" 
          question={questions[currentPage]} 
        />
          <FooterTest
            result={result}
            typeOftest="PracticeTest"
          />
      </div>
      
      }
    </>
  );
}
