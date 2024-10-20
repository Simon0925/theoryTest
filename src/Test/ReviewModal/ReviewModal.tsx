import styles from "./ReviewModal.module.scss";
import Logo from "../Logo/Logo";
import { useEffect, useState } from "react";
interface ReviewModalProps {
    cancelClick: (e: boolean) => void;
    questionsUnanswered: number;
    questionsFlagged: number;
    setShowUnansweredOnly: (unanswered: boolean) => void;
    setShowAllOnly: (all: boolean) => void;
    setShowFlagged:(flagged:boolean) => void;
    results:(e:boolean) => void
}
export default function ReviewModal({
    cancelClick,
    questionsUnanswered,
    questionsFlagged,
    setShowUnansweredOnly,
    setShowAllOnly,
    setShowFlagged,
    results
}: ReviewModalProps) {

    const [showButtons,setshowButtons] = useState(false)
    
    const goToResults = () => {
        results(true)
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
    useEffect(()=>{ 
        if(questionsUnanswered !== 50){
            setshowButtons(true)
        }else{
            setshowButtons(false)
        }
    },[questionsUnanswered])
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
                        
                        <button  onClick={handleReviewAll} className={showButtons ?styles.btnHiddenLine : styles.btn2 }>
                            Review all
                        </button>
                        
                        {showButtons ?
                        <>
                        <button onClick={handleReviewUnanswered} className={questionsFlagged > 0  ?styles.btnHiddenLine : styles.btnHidden }>
                            Review unanswered
                        </button>
                        {questionsFlagged > 0 ? 
                            <button onClick={handleReviewFlagged}   className={styles.btnHidden}>
                            Review flagged
                           </button> :
                           null
                           }
                        </>
                        : null }
                        
                    </div>
                    <button onClick={() => cancelClick(false)} className={styles.btn2}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
