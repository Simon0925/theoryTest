import { useState } from 'react'
import FooterHPT from '../../components/FooterHPT/FooterHPT'
import VideosSet from '../../components/VideosSet/VideosSet'
import styles from './HPT.module.scss'
import Introduction from '../../components/Introduction/Introduction'


export default function HPT () {
    
    const [isIntroduction,setIsIntroduction] = useState(false)

    return(
        <>
            {!isIntroduction &&
                <div className={styles.wrap}>
                    <div className={styles.plate}>
                        <p>DVSA CGI videos</p>
                    </div>
                    <VideosSet />
                    <div className={styles.plate}>
                        <p>DVSA non-CGI videos</p>
                    </div>
                    <VideosSet />
                    <footer >
                        <FooterHPT isIntroduction={setIsIntroduction} />
                    </footer>
                </div>
            }
            {isIntroduction && <Introduction exit={setIsIntroduction} /> } 
        </>
    )
}