import styles from "./VideosSet.module.scss"

import Video20 from "./img/Video20.png"; 



export default function VideosSet () {
    return(
        <>
            <div className={styles.wrap}>
                <div className={styles.videoPicture}>
                    <img src={Video20} alt="Video Thumbnail" />
                    <div className={styles.number}>1</div>
                </div>
            </div>
        </>
    )
}