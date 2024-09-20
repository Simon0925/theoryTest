import { useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import Modal from '../Modal/Modal';
import styles from './FooterMockTest.module.scss';

const modalText = "The Mock Test replicates the actual DVSA test: 50 questions and a countdown timer of 57 minutes. The pass mark is 43 correct answers, or 86%. You can flag and review questions, and change answers within the time. One difference: you can pause this Mock Test – you can't pause the DVSA test.";

interface FooterMockTestProps {
    onTestStart: () => void; 
}

export default function FooterMockTest({ onTestStart }: FooterMockTestProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.container}>
                    
                    <ButtonTest
                        click={toggleModal}
                        name="About Mock Test"
                        color="#0078AB"
                        backgroundColor="white"
                        svg={false}
                        svgColor={false}
                    />

                    <div className={styles.start}>
                        <ButtonTest
                            name="Start"
                            color="white"
                            backgroundColor="#00B06F"
                            svg={false}
                            svgColor={false}
                            click={onTestStart} 
                        />
                    </div>
                </div>
                {isModalOpen && (
                    <Modal close={toggleModal} text={modalText} title="About Mock Test" cancel={false} blueBtnText={'Ok'} />
                )}
            </div>
        </>
    );
}
