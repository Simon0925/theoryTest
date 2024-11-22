import styles from './Error.module.scss';


export default function Error () {
    
    return(
        <>
            <div className={styles.wrap}>
                <div className={styles.container}>
                    <span>404 Page not find</span>
                </div>
            </div>
        </>
    )
}