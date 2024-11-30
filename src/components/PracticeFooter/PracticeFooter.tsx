import { useCallback, useState } from 'react';
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
}

export default function PracticeFooter({ result, typeOftest }: FooterTestProps) {

  const { questions, currentPage } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );
  
  const { navigatePage, isModalVisible, setModalVisible } = usePageNavigation({typeOftest,totalQuestions:questions});


  const color = useSelector((state: RootState) => state.color.themeData);

  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  const modalRoot = document.getElementById("modal-root");
  
  const handleResultModal = useCallback(() => {
    if (result) result(true);
    setModalVisible(false);
  }, [result]);

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
