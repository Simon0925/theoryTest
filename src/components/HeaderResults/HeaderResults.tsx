import { useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest'
import styles from './HeaderResults.module.scss'
import Modal from '../Modal/Modal';

interface HeaderResultsProps {
    exitResult:(e:boolean) => void 
}


export default function HeaderResults ({exitResult}:HeaderResultsProps) {

    const [showExitModal, setShowExitModal] = useState(false);

    const exit = () =>{
        localStorage.setItem("result", JSON.stringify([]));
        setShowExitModal(true)
    }
    const handleModalCancel =  () => {
        setShowExitModal(!showExitModal);
      };
      const handleModalClose =  () => {
        exitResult(false)
      };

    return(
        <>
            <div className={styles['wrap']}>
                <ButtonTest name={'Exit'} color={'white'} backgroundColor={'#A73530'} svg={false} click={exit} svgColor={false} />
                <span className={styles['title']}>Nice Try!</span>
                <span></span>
            </div>
           {
            showExitModal && (
                <Modal 
                  close={handleModalClose} 
                  text={""} 
                  title="Are you sure you want to exit from the test results?" 
                  cancelClick={handleModalCancel}
                  cancel={true} 
                  blueBtnText={'Exit'} 
                />
              )}
           
        </>
    )
}