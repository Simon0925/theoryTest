import { CirclePercent } from '../../UI/CirclePercent/CirclePercent'
import styles from './DataStatisticsAssessment.module.scss'

interface Data {
    date:string;
    time:string;
    percentage:number;
}

interface DataStatisticsAssessmentProps {
    data:Data[]
}



export default function DataStatisticsAssessment({ data }: DataStatisticsAssessmentProps) {
    return (
        <div className={styles.wrap}>
            {data.map((d, index) => (
                <div className={styles["data-wrap"]} key={`${d.date}-${index}`}>
                    <span>{d.date}</span>
                    <div className={styles["data-statistic"]}>
                        <span>{d.time}</span>
                        <CirclePercent currentPercent={d.percentage} />
                    </div>
                </div>
            ))}
        </div>
    );
}
