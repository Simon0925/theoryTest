import { useEffect, useState, useCallback, useMemo } from 'react';
import styles from './CircleTrainer.module.scss';

const CircleTrainer = () => {
    const [curentPercent, setCurentPercent] = useState(0);

    const [circleFilled, setCircleFilled] = useState({
        filled: 25,
        indent: 75,
        circleBlueDashoffset: 0.75
    });

    const r = 16;
    const circleLength = useMemo(() => 2 * Math.PI * r, [r]); 
    const x = 21;
    const y = 21;

    const filled = useCallback((percent:number) => {
        setCircleFilled((prev) => ({
            filled: prev.filled === 76 ? 75 : prev.filled + percent,
            indent: prev.indent === 24 ? 25 : prev.indent - percent,
            circleBlueDashoffset: Number((prev.circleBlueDashoffset - (percent / 100)).toFixed(2))
        }));
    }, []);

    const incrementPercent = useCallback(() => {
        if (curentPercent <= 55) {
            setTimeout(() => {
                filled(1); 
                setCurentPercent((prev) => prev + 1);
            }, 3);
        }
        else if(curentPercent <= 75) {
            setTimeout(() => {
                filled(1); 
                setCurentPercent((prev) => prev + 1);
            }, 20);
        }
    }, [curentPercent, filled]);

    useEffect(() => {
        if (curentPercent < 75) {
            incrementPercent();
        }
    }, [curentPercent, incrementPercent]);

    return (
        <>
            <svg
                width="100%"   
                height="100%"   
                viewBox="0 0 42 42" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    r={18}
                    cx={x}
                    cy={y}
                    fill="#0096CE"  
                    stroke="none"
                />
                <circle
                    className={styles.circleBlue}
                    r={r}
                    cx={x}
                    cy={y}
                    fill="transparent"
                    stroke="#0078AB"
                    strokeWidth="5"
                    strokeDasharray={circleLength}
                    strokeDashoffset="0"
                    transform="rotate(-90 21 21)"
                />
                <circle
                    r={r}
                    cx={x}
                    cy={y}
                    fill="transparent"
                    stroke="#00BE5D"
                    strokeWidth="5"
                    strokeDasharray={`${ circleFilled.filled} ${circleFilled.indent}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 21 21)"
                />
                <circle
                    r={r}
                    cx={x}
                    cy={y}
                    fill="transparent"
                    stroke="#0079AC"
                    strokeWidth="5"
                    strokeDasharray={`${circleLength * 0.25} ${circleLength * 0.75}`}
                    strokeDashoffset={circleLength * circleFilled.circleBlueDashoffset}
                    transform="rotate(180 21 21)"
                />
                <text
                    x="50%" 
                    y="35%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="white" 
                    fontSize="4" 
                >
                    in total
                </text>
                <text
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="white" 
                    fontSize="5" 
                >
                    746
                </text>
                <text
                    x="50%" 
                    y="65%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="white" 
                    fontSize="4" 
                >
                    questions
                </text>
            </svg>
        </>
    );
};

export default CircleTrainer;
