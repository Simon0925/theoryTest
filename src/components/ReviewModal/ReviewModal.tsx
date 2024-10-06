import styles from "./ReviewModal.module.scss";
import Logo from "../Logo/Logo";
import { useNavigate } from 'react-router-dom';
interface ReviewModalProps {
    cancelClick: (e: boolean) => void;
    questionsUnanswered: number;
    questionsFlagged: number;
    setShowUnansweredOnly: (unanswered: boolean) => void;
    setShowAllOnly: (all: boolean) => void;
    setShowFlagged:(flagged:boolean) => void;
}
export default function ReviewModal({
    cancelClick,
    questionsUnanswered,
    questionsFlagged,
    setShowUnansweredOnly,
    setShowAllOnly,
    setShowFlagged,
}: ReviewModalProps) {
    const navigate = useNavigate();

    const goToResults = () => {
        navigate('/results');
    };

    const handleReviewAll = () => {
        setShowAllOnly(false)
        cancelClick(false); 
    };

    const handleReviewUnanswered = () => {
        setShowUnansweredOnly(true);  
        cancelClick(false); 
    };

    const handleReviewFlagged = () =>{
        setShowFlagged(true)
        cancelClick(false); 
    }

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
                        <button  onClick={goToResults} className={styles.btn1}>
                            Show results
                        </button>
                        <button onClick={handleReviewAll} className={styles.btn2}>
                            Review all
                        </button>
                        <button onClick={handleReviewUnanswered} className={styles.btn2}>
                            Review unanswered
                        </button>
                        {questionsFlagged > 0 ? 
                         <button onClick={handleReviewFlagged}   className={styles.btn2}>
                         Review flagged
                        </button> :
                        null
                        }
                    </div>
                    <button onClick={() => cancelClick(false)} className={styles.btn2}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
