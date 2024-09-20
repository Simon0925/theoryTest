import { useState } from 'react';
import FooterMockTest from '../../components/FooterMockTest/FooterMockTest';
import MockTestChart from '../../components/MockTestChart/MockTestChart';
import styles from './MockTest.module.scss';
import Assessment from '../../components/Assessment/Assessment';

export default function MockTest() {
    const [isTestStarted, setIsTestStarted] = useState(false);
   

    const handleTestClose = () => {
        setIsTestStarted(false); 
    };

    return (
        <div className={styles.mockTestContainer}>
            {!isTestStarted && <MockTestChart data={null} />}
            {isTestStarted && <Assessment onClose={handleTestClose} />}
            {!isTestStarted &&<FooterMockTest onTestStart={() => setIsTestStarted(true)} />}
        </div>
    );
}
