
import CircleTrainer from '../../UI/CircleTrainer/CircleTrainer';
import styles from './Error.module.scss';


export default function Error () {
    
    return(
        <>
            <div className={styles.wrap}>
                <div className={styles.container}>
                <CircleTrainer
                    twiceData={20}
                    onesData={70}
                    />
                </div>
            </div>
        </>
    )
}