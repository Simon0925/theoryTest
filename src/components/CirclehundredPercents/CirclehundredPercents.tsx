import { useMemo } from "react";
import styles from "./CirclehundredPercents.module.scss";

interface CirclehundredPercentsProps{
    currentPercent:number;
}



export default function CirclehundredPercents ({currentPercent}:CirclehundredPercentsProps){
    const st = useMemo(() => ({
		color:'white',
		fontSize: '15px'
	}), []);
    return(
        <div className={styles['circular-progress']}>
       <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        aria-labelledby='title' role='graphic'
       >
        <circle  cx="50" cy="50" r="40" ></circle>
       </svg>
       <p  style={st} className={styles['pct']} >{currentPercent}%</p>
       </div>
    )
}