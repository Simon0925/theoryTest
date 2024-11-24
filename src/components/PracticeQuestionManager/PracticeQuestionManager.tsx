import PracticeTopics from "../PracticeTopics/PracticeTopics"
import PracticeSettings from "../PracticeSettings/PracticeSettings"
import styles from "./PracticeQuestionManager.module.scss"

interface PracticeQuestionManagerProps {
    practiceTest: (e: boolean) => void;
}


export default function PracticeQuestionManager ({practiceTest}:PracticeQuestionManagerProps) {
    return(
        <div className={styles.wrap}>
            <div className={styles.group}>
                <PracticeTopics />
            </div>
            <div className={styles.settings}>
                <PracticeSettings practiceTest={practiceTest} />
            </div>
        </div>
    )
}