
import VideoPlayer from "../VideoPlayer/VideoPlayer"
import styles from "./Introduction.module.scss"


interface VideoProps {
    exit:(e:boolean) => void
}

export default function Introduction ({exit}:VideoProps) {
   

    return(
        <>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <button onClick={() =>exit(false)}  className={styles.btn} >Exit</button>
                    <span className={styles.title}>DVSA introduction</span>
                </div>
                <VideoPlayer />
            </div>
        </>
    )
}