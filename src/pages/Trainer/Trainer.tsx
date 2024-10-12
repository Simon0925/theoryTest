import CircleTrainer from '../../UI/CircleTrainer/CircleTrainer'
import styles from './Trainer.module.scss'


export default function Trainer () {
    return(
        <>
        <div className={styles.wrap}>
            <div className={styles["totalQuestions"]}>
                <div className={styles["once"]}>
                    <div className={styles["container"]} >
                        <p className={styles["percent"]}>100%</p>
                        <p className={styles["title"]}>once</p>
                    </div>
                </div>
                <div className={styles["circle"]}>
                    <CircleTrainer />
                </div>
                <div className={styles["twice"]}>
                    <div className={styles["container"]} >
                        <p className={styles["percent"]}>100%</p>
                        <p className={styles["title"]}>twice</p>
                    </div>
                </div>
            </div>
            <div className={styles["description"]} >
                <p>
                    Personal Trainer uses an algorithm that learns about you as you progress.
                    It first shows you the questions you need to learn the most.
                    You can answer as many questions as you wish each time - it will remember the questions you've yet to see or have answered incorrectly.
                </p>
            
                <p>
                    In the dynamic chart above, you'll see your progress as you answer questions correctly once, and then twice.
                    It includes your answers from 'Practice Mode' and the 'Mock Test'. We find this is the best way to coach you for the test
                </p>
            </div>
            <div className={styles['btn']}>
                <button >Start</button>
            </div>
        </div>
        </>
    )
}