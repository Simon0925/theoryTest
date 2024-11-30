import styles from './PracticeTest.module.scss';
import PracticeFooter from '../PracticeFooter/PracticeFooter';
import { useCallback, useEffect, useState } from 'react';
import HeaderForTest from '../HeaderForTest/HeaderForTest';
import Spinner from '../../UI/Spinner/Spinner';
import { RootState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import QuestionWithAnswers from '../QuestionWithAnswers/QuestionWithAnswers';
import { setTestInactive } from '../../store/currentData/currentData.slice';
import Modal from '../Modal/Modal';
import ReactDOM from "react-dom";
interface PracticeTestProps {
  closeTest: (e: boolean) => void;
  result: (e: boolean) => void;
}

export default function PracticeTest({ closeTest, result }: PracticeTestProps) {

  const [exit, setExit] = useState(false);

  const color = useSelector((state: RootState) => state.color.themeData);

  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible ] = useState(false)
 
  const { questions, currentPage, isLoading } = useSelector(
    (state: RootState) => state.currentData.testsData["PracticeTest"],  
    shallowEqual
  );
  
  useEffect(()=>{
    if(questions.length > 0){
      dispatch(setTestInactive(true))
    }
  },[questions])


  useEffect(() => {
    closeTest(!exit);
  }, [exit]);

  const handleResultModal = useCallback(() => {
    result(true);
    setModalVisible(false);
  }, [result,setModalVisible]);

  const modalRoot = document.getElementById("modal-root");


  return (
    <>
      {isLoading ?
      <div className={styles.spinner}><Spinner  /></div> 
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
          <PracticeFooter
            modalState={isModalVisible}
            result={setModalVisible}
            typeOftest="PracticeTest"
          />
      </div>
      }
      {isModalVisible&& modalRoot &&
          ReactDOM.createPortal(
        <Modal
          close={handleResultModal}
          text="End of test reached"
          title="Would you like to see the test results?"
          cancel
          cancelClick={() => setModalVisible(false)}
          blueBtnText="Show results"
        />,modalRoot
        )}
    </>
  );
}
