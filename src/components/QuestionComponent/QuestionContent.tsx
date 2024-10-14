import styles from "./QuestionContent.module.scss";

import hostname from "../../config/hostname";

interface QuestionContentProps {
    question: string;
    photo?: string;
    markers: boolean; 
}

export default function QuestionContent({ question, photo, markers }: QuestionContentProps) {



    return (
        <div className={styles['question-wrap']}>
            <span className={styles['question']}>
                <div className={markers ? styles['marker'] : styles['inactive-marker']}></div>
                <div>{question}</div>
            </span>
            {photo && (
                <img
                    className={styles['img']}
                    src={`${hostname}${photo}`}
                    alt="Related to the question" 
                    loading="lazy" 
                />
            )}
        </div>
    );
}
