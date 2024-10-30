import PracticeGroup from "../PracticeGroup/PracticeGroup"
import styles from "./PracticeQuestionsManagerMobile.module.scss"



export default function PracticeQuestionsManagerMobile () {

    return(
        <div className={styles.wrap}>
            <div className={styles.group}>
                <PracticeGroup />
            </div>
            <button className={styles.btn}>
                    Next
            </button>
        </div>
    )
}