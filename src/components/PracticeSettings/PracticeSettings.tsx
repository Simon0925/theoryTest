import Toggle from '../../UI/Toggle/Toggle'
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions'
import PracticeTools from '../PracticeTools/PracticeTools'
import styles from './PracticeSettings.module.scss'



export default function PracticeSettings () {
    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['toggle-container']}>
                    <span>Show correct answer instantly</span>
                    <Toggle />
                </div>
               <PracticeTools />
               <NumberOfQuestions />
               <div className={styles['btn']}>
                    <button>Start</button>
               </div>
            </div>
        </>
    )
}