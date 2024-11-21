import { useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './HeaderResults.module.scss';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import ReactDOM from 'react-dom';
import { handleModalClose as closeHandler } from './services/handleModalClose';

interface HeaderResultsProps {
  exitResult: (e: boolean) => void;
  typeOftest: string;
}

export default function HeaderResults({ exitResult, typeOftest }: HeaderResultsProps) {
  const [showExitModal, setShowExitModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {headerColors,textColor} = useSelector((state: RootState) => state.color.themeData);

  const modalRoot = document.getElementById('modal-root');

  const handleModal = () => {
    setShowExitModal(!showExitModal);
  };

  return (
    <>
      <div style={{ background: headerColors }} className={styles.wrap}>
        <div className={styles.btn1}>
          <ButtonTest
            name={'Exit'}
            color={'white'}
            backgroundColor={'#A73530'}
            svg={false}
            click={handleModal}
            svgColor={false}
          />
        </div>
        <div className={styles.btn2}>
          <button style={{ background: headerColors, color: textColor }} onClick={handleModal}>
            Exit
          </button>
        </div>
        <span style={{ color: textColor }} className={styles.title}>
          Nice Try!
        </span>
        <span className={styles.plug}></span>
      </div>
      {showExitModal &&
        modalRoot &&
        ReactDOM.createPortal(
          <Modal
            close={() => closeHandler(typeOftest, dispatch, exitResult)}
            text={''}
            title="Are you sure you want to exit from the test results?"
            cancelClick={handleModal}
            cancel={true}
            blueBtnText={'Exit'}
          />,
          modalRoot
        )}
    </>
  );
}
