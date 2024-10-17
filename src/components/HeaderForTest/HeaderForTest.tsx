import React, { useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './HeaderForTest.module.scss';
import Modal from '../Modal/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface HeaderForTestProps {
  onExitClick: (e: boolean) => void;
  questionCount: number;
  currentQuestion: number;
  children?: React.ReactNode;
  finish: string;
  mockTest?: boolean;
  reviewClick?:(e:boolean) => void;
  result?:(e:boolean) => void;
  trainerTest?: boolean;
}

export default function HeaderForTest({
  questionCount,
  currentQuestion,
  finish,
  children,
  onExitClick,
  mockTest,
  reviewClick,
  result,
  trainerTest
}: HeaderForTestProps) {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const color = useSelector((state: RootState) => state.color);



  const handleExit = () => {
    setShowExitModal(true);
  };

  const handleResults = () => {
         if (mockTest && reviewClick) {
            reviewClick(true)
        }else{
            setShowResultsModal(!showResultsModal);
        }
  };

  const handleModalClose = () => {
    onExitClick(true);  
  };

  const handleModalCancel = () => {
    setShowExitModal(false);
  };

  const handleResultsModalCancel =  () => {
    setShowResultsModal(!showResultsModal);
  };
  const handleResultsModalClose =  () => {
    if(result){
      result(true)
    }
  };

  return (
    <div style={{backgroundColor: color.headerColors}} className={styles.wrap}>
      <ButtonTest
        name={"Exit"}
        color={"white"}
        backgroundColor={"#A73530"}
        svg={false}
        click={handleExit}
        svgColor={false}
      />
      {trainerTest !== true &&
        <div className={styles['count-questions']}>
          <span>Question</span>
          <span>{currentQuestion + 1}</span>
          <span>of</span>
          <span>{questionCount}</span>
        </div>
      }
      {trainerTest === true &&
        <div className={styles['count-questions']}>Road and traffic signs</div>
      }
      <ButtonTest
        name={finish}
        color={"white"}
        backgroundColor={"#00B06F"}
        svg={false}
        click={handleResults} 
        svgColor={false}
      />
      {children && <div className={styles.extraContent}>{children}</div>}
      {showExitModal && (
        <Modal 
          close={handleModalClose} 
          text={""} 
          title="Are you sure you want to exit from the test?" 
          cancelClick={handleModalCancel}
          cancel={true} 
          blueBtnText={'Exit test'} 
        />
      )}
      {showResultsModal && mockTest != true && (
        <Modal 
          close={handleResultsModalClose} 
          text={"Are you sure you want to finish current test and see the test results?"} 
          title="End of test" 
          cancelClick={handleResultsModalCancel}
          cancel={true} 
          blueBtnText={'Show results'} 
        />
      )}
      
    </div>
  );
}
