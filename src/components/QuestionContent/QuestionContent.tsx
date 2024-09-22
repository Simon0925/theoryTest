import styles from "./QuestionContent.module.scss";

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
                    src={`http://localhost:8080${photo}`}
                    alt="Question Image"
                />
            )}
        </div>
    );
}
