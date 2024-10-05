import styles from "./ReviewModal.module.scss"
import Logo from "../Logo/Logo";


interface ReviewModalProps {
    cancelClick: (e:boolean) => void;
    reviewUnanswered:(e:boolean) => void;
    questionsUnanswered:number;
    questionsFlagged:number;
}

export default function ReviewModal ({cancelClick,reviewUnanswered,questionsUnanswered,questionsFlagged}:ReviewModalProps)  {
    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.textBlock}>
                    <span className={styles.text}>{questionsUnanswered} questions unanswered</span>
                    <span className={styles.text}>{questionsFlagged} questions flagged</span>
                </div>
                <div className={styles.btn}>
                    <div className={styles.btnBlock}>
                        <button  className={styles.btn1}>
                            Show results
                        </button>
                        <button  className={styles.btn2}>
                            Review all
                        </button>
                        <button onClick={() => reviewUnanswered(true)}  className={styles.btn2}>
                            Review unanswered
                        </button>
                    </div>
                    <button onClick={() => cancelClick(false)} className={styles.btn2}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}