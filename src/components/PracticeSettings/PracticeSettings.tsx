import Toggle from '../../UI/Toggle/Toggle'
import styles from './PracticeSettings.module.scss'



export default function PracticeSettings () {
    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['toggle-container']}>
                    <span>Show correct answer instantly</span>
                    <Toggle />
                </div>
            </div>
        </>
    )
}