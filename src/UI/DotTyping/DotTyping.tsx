import styles from './DotTyping.module.scss';






export default function DotTyping () {
    return (
        <div className={styles.dotTypingContainer}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    )
}