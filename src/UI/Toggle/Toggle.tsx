import styles from './Toggle.module.scss'



export default function Toggle () {
    return(
        <>
            <div className={styles['wrap']}>
                <input type="checkbox" />
                <span className={styles['slider']}></span>
            </div>
        </>
    )
}