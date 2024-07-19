import Par from '../../components/Par/Par'
import PracticeSettings from '../../components/PracticeSettings/PracticeSettings'
import styles from './Practice.module.scss'



export default function Practice () {
    return(
        <>
        <div className={styles['wrap']}>
            <div className={styles['qwestions']}>
                <Par />
            </div>
            <div className={styles['settings']}>
                <PracticeSettings />
            </div>
        </div>
        </>
    )
}