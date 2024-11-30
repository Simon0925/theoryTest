import { useCallback, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Modal from '../Modal/Modal';
import styles from './PracticeFooter.module.scss';
import { RootState } from '../../store/store';

import ReactDOM from "react-dom";
import { usePageNavigation } from '../../hooks/useFooterHooks/usePageNavigation';
import PracticeFooterMobileButtons from '../PracticeFooterMobileButtons/PracticeFooterMobileButtons';
import PracticeFooterDesktopButtons from '../PracticeFooterDesktopButtons/PracticeFooterDesktopButtons';

interface FooterTestProps {
  result?: (e: boolean) => void;
  typeOftest: string;
  modalState?:boolean;
}

export default function PracticeFooter({ result, typeOftest,modalState }: FooterTestProps) {

  const { questions, currentPage } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );
  
  const { navigatePage, isModalVisible, setModalVisible } = usePageNavigation({typeOftest});

  useEffect(()=>{
    if (result) result(isModalVisible) 
  },[isModalVisible])

  useEffect(()=>{
    if(modalState === false)
    setModalVisible(modalState)
  },[modalState])


  const color = useSelector((state: RootState) => state.color.themeData);

  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  const modalRoot = document.getElementById("modal-root");
  
  

  return (
    <div className={styles.wrap} style={{ backgroundColor: color.headerColors }}>
      <div className={styles.container}>
        <PracticeFooterDesktopButtons
          navigatePage={navigatePage}
          typeOftest={typeOftest} 
          setIsExplanationVisible={ setIsExplanationVisible}
        />
      </div>
      <div className={styles.mobileContainer}>
          <PracticeFooterMobileButtons 
            navigatePage={navigatePage}
            typeOftest={typeOftest} 
            setIsExplanationVisible={ setIsExplanationVisible} 
          /> 
      </div>
      {isExplanationVisible &&modalRoot &&
          ReactDOM.createPortal (
        <Modal
          close={() => setIsExplanationVisible(false)}
          text={questions[currentPage]?.explanation || 'No explanation available'}
          title="Explanation"
          blueBtnText="Ok"
        />,modalRoot
        )}
    </div>
  );
}
