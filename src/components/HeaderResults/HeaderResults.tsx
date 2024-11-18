import { useCallback, useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest'
import styles from './HeaderResults.module.scss'
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { resetPracticeState, resetPracticeStateThunk } from '../../store/practice/practice.slice';
import { resetState, setTestInactive } from '../../store/currentData/currentData.slice';

interface HeaderResultsProps {
    exitResult:(e:boolean) => void;
    typeOftest:string;
}

export default function HeaderResults ({exitResult,typeOftest}:HeaderResultsProps) {

    const [showExitModal, setShowExitModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const color = useSelector((state: RootState) => state.color);


    const handleModalClose = useCallback(() => {
      switch (typeOftest) {
        case "PracticeTest":
          dispatch(resetState({ testId: typeOftest }));
          dispatch(resetPracticeState());
          dispatch(resetPracticeStateThunk());
          dispatch(setTestInactive(false));
          break;
        case "MockTest":
          dispatch(resetState({ testId: typeOftest }));
          break;
        default:
          console.error(`Test ID "${typeOftest}" does not exist in state.`);
      }
      exitResult(false)
      dispatch(resetState({ testId: typeOftest }));
    }, [dispatch,  typeOftest]);
    
    const handleModal =  () => {
        setShowExitModal(!showExitModal);
    };
      

    return(
        <>
            <div style={{background:color.headerColors}} className={styles.wrap}>
                <div className={styles.btn1}>
                  <ButtonTest name={'Exit'} color={'white'} backgroundColor={'#A73530'} svg={false} click={handleModal} svgColor={false} />
                </div>
                <div className={styles.btn2}>
                  <button style={{background:color.headerColors,color:color.textColor}} onClick={handleModal}>
                    Exit
                  </button>
                </div>
                <span style={{color:color.textColor}} className={styles.title}>Nice Try!</span>
                <span style={{width:"100px"}}></span>
            </div>
           {
            showExitModal && (
                <Modal 
                  close={handleModalClose} 
                  text={""} 
                  title="Are you sure you want to exit from the test results?" 
                  cancelClick={handleModal}
                  cancel={true} 
                  blueBtnText={'Exit'} 
                />
              )}
           
        </>
    )
}