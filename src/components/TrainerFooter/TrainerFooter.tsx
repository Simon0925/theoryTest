import { useEffect, useState } from 'react';
import styles from './TrainerFooter.module.scss';
import Modal from '../Modal/Modal';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import TrainerFooterDesktopButtons from '../TrainerFooterDesktopButtons/TrainerFooterDesktopButtons';
import { usePageNavigation } from '../../hooks/usePageNavigation';
import TrainerFooterMobileButtons from '../TrainerFooterMobileButtons/TrainerFooterMobileButtons';

interface TrainerFooterProps {
    result:(e:boolean) => void
    typeOftest:string
}

export default function TrainerFooter({result,typeOftest}:TrainerFooterProps) {



    const color = useSelector((state: RootState) => state.color.themeData);

    const { questions, currentPage} = useSelector(
        (state: RootState) => state.currentData.testsData["Trainer"],  
        shallowEqual
    );
    const [isExplanationVisible, setIsExplanationVisible] = useState(false);

    
    const { navigatePage, isModalVisible, setModalVisible } = usePageNavigation({typeOftest});
    
    useEffect(()=>{
        if(isModalVisible){
            result(isModalVisible)
            setModalVisible(!isModalVisible)
        }
      },[isModalVisible])
    
    return(
        <div style={{background:color.headerColors}} className={styles['wrap']}>
            <div className={styles['container']}>
                <TrainerFooterDesktopButtons 
                typeOftest={typeOftest} 
                setIsExplanationVisible={setIsExplanationVisible} 
                navigatePage={navigatePage} />
            </div>
            <div className={styles.mobileContainer}>
                <TrainerFooterMobileButtons 
                typeOftest={typeOftest} 
                setIsExplanationVisible={setIsExplanationVisible} 
                navigatePage={navigatePage}  />
            </div>

            {isExplanationVisible === true && (
                <Modal 
                    close={() => setIsExplanationVisible(false)} 
                    text={questions[currentPage].explanation || ""} 
                    title={'DVSA explanation'} 
                    cancel={false} 
                    blueBtnText={'Ok'} 
                />
            )}
        </div>
    )
}