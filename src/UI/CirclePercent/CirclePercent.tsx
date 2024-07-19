import styles from './CirclePercent.module.scss';
import  { useEffect, useState, useMemo } from 'react';


interface CirclePercentProps {
	currentPercent: number,
	radius?: number,
}

export function CirclePercent({
	currentPercent,
	radius=40
}: CirclePercentProps){
	const [percent, setPersent] = useState<number>(0);

	const twoP = useMemo(() => (2 * (22 / 7)), []);
	const delay = useMemo(() => (1 - (percent / 100)), [percent]);
	const circleCircumstance = useMemo(() =>
		twoP * radius,
	[twoP, radius]);

	const converted = useMemo(() => ({
		strokeDasharray: `${circleCircumstance}`,
		strokeDashoffset: `${delay * circleCircumstance}`,
		stroke:'#00C65D'
	}), [circleCircumstance, delay]);

	const st = useMemo(() => ({
		color:'#378AB6',
		fontSize: '15px'
	}), []);
	
	useEffect(()=>{
		if (percent < currentPercent) {
			setTimeout(() => {
				setPersent((prev)=>prev + 1);
			}, 25);
		}
	}, [percent, currentPercent]);

	return(

		<div className={styles['circular-progress']}>
			<svg 
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 100 100'
				aria-labelledby='title' role='graphic'
			>
				<circle  cx="50" cy="50" r="40" ></circle>
				<circle style={converted} cx="50" cy="50" r="40" id='pct-ind'></circle>
			</svg>
			<p  style={st} className={styles['pct']} >{percent}%</p>
		</div>				
	);
}