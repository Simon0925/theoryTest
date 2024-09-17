import { useState } from 'react'
import ButtonTest from '../../UI/ButtonTest/ButtonTest'
import styles from './FooterMockTest.module.scss'
import Modal from '../Modal/Modal'


const text = "The Mock Test replicates the actual DVSA test: 50 questions and a countdown timer of 57 minutes. The pass mark is 43% correct answers, or 86%. You can flag and review questions, and change answers within the time. One difference: you can pause this Mock Test – you can't pause the DVSA test"


export default function FooterMockTest () {
    
    const [openModal,setOpenModal] = useState(false)


    const open = () => {
        setOpenModal(!openModal)
        
    }

    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['container']}>
                    <ButtonTest
                        click={open}
                        name={'About Mosk Test'}
                        color={'#0078AB'}
                        backgroundColor={'white'}
                        svg={false}
                        svgColor={false}
                    />
                    <div className={styles.start} >
                    <ButtonTest
                        name={"Start"}
                        color={'white'}
                        backgroundColor={'#00B06F'}
                        svg={false}
                        svgColor={false} click={null}  
                    />
                    </div>
            </div>
            {openModal === true && (
            <Modal close={open} text={text} title={'About Mock Test'} />
          )}
        </div>
        </>
    )
}