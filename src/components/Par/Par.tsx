import styles from './Par.module.scss'
import AlertSvg from '../../SVG/AlertSvg/AlertSvg'
import { CirclePercent } from '../../UI/CirclePercent/CirclePercent'

interface ParProps {
    
}

export default function Par () {
    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['title']}>
                    <AlertSvg />
                    <span>Alertness (26)</span>
                </div>
                <CirclePercent currentPercent={60} />
            </div>
        </>
    )
}