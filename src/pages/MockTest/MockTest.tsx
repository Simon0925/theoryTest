import { useState } from 'react';
import FooterMockTest from '../../components/FooterMockTest/FooterMockTest';
import MockTestChart from '../../components/MockTestChart/MockTestChart';
import styles from './MockTest.module.scss';
import Assessment from '../../components/Assessment/Assessment';
import DataStatisticsAssessment from '../../components/DataStatisticsAssessment/DataStatisticsAssessment';




export default function MockTest() {
    localStorage.setItem("result", JSON.stringify([]));
    const [isTestStarted, setIsTestStarted] = useState(false);
   

    const handleTestClose = () => {
        setIsTestStarted(false); 
    };

    const data = [{
        date:"6 Oct 2024",
        time:"22m 52s",
        percentage:88
    },
    {
        date:"6 Oct 2024",
        time:"22m 52s",
        percentage:50
    },
    {
        date:"6 Oct 2024",
        time:"22m 52s",
        percentage:90
    },
    {
        date:"6 Oct 2024",
        time:"22m 52s",
        percentage:40
    },{
        date:"6 Oct 2024",
        time:"22m 52s",
        percentage:30
    },{
        date:"6 Oct 2024",
        time:"22m 52s",
        percentage:88
    },
    {
        date:"6 Oct 2024",
        time:"22m 52s",
        percentage:75
    }
    ]

    return (
        <div className={styles.mockTestContainer}>
            {!isTestStarted && <MockTestChart data={data} />}
            {!isTestStarted && <DataStatisticsAssessment data={data} />}
            {isTestStarted && <Assessment onClose={handleTestClose} />}
            {!isTestStarted &&<FooterMockTest onTestStart={() => setIsTestStarted(true)} />}
        </div>
    );
}
