import { useSelector } from 'react-redux';
import { CirclePercent } from '../../UI/CirclePercent/CirclePercent'
import { RootState } from '../../store/store';
import styles from './DataStatisticsAssessment.module.scss'
import {DataStatisticsAssessmentProps} from './interface'


export default function DataStatisticsAssessment({ data }: DataStatisticsAssessmentProps) {
    
    const color = useSelector((state: RootState) => state.color.themeData);


    return (
        <>
            <p 
            className={styles.title}
            style={{color:color.DataStatisticsAssessmentTitle}}
            >Record of previous tests</p>
            <div
             className={styles.wrap}
 
             >
                {data.map((d, index) => (
                    <div 
                        className={styles["data-wrap"]} 
                        key={`${d.date}-${index}`}
                        style={{color:color.DataStatisticsAssessmentContent,
                            backgroundColor:color.DataStatisticsAssessmentBackground
                        }}
                    >
                        <span>{d.date}</span>
                        <div className={styles["data-statistic"]}>
                            <span>{d.time}</span>
                            <CirclePercent currentPercent={d.percentage} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
