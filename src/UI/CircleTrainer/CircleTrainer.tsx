
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface CircleTrainerProps{
    onesData: number | null;
    twiceData: number | null;
}

export default function CircleTrainer ({
    twiceData,
    onesData
}:CircleTrainerProps) {

    const {
        OnceTwiceProgressOnesBackground,
        VariantTitleColor,
        mainColor,
        CircularTrainerProgressBarColor
    } = useSelector((state: RootState) => state.color);

    const strokeWidth = 12;

    const radius = 50 - strokeWidth / 2;

    const circleLength = 2 * Math.PI * radius;

    const [currentPercent, setCurrentPercent] = useState({ 
        once: 0,
        twice: 0 
    });
    const [segmentLength, setSegmentLength] = useState({
        once: circleLength,
        twice: circleLength,
    });
    
    const [greenEndAngle, setGreenEndAngle] = useState(0);

    const incrementPercent = (
        delay: number,
        target: number,
        key: "once" | "twice"
    ) => {
        const update = (currentValue: number) => {
            if (currentValue <= target) {
                setCurrentPercent((prev) => ({ ...prev, [key]: currentValue }));
                setTimeout(() => update(currentValue + 1), delay);
            }
        };
        update(0);
    };

    useEffect(() => {
        if (typeof twiceData === "number" && typeof onesData === "number") {
            incrementPercent(20, twiceData, "twice");
            incrementPercent(20, onesData, "once");
        }
    }, [twiceData, onesData]);

    
    const calculateSegment = (percent: number, totalPercent: number) => {
        const scaledPercent = (percent * totalPercent) / 100 / 100;
        return {
            segmentLength: circleLength - circleLength * scaledPercent,
            endAngle: 270 + scaledPercent * 360,
        };
    };

    useEffect(() => {
        const { segmentLength: twiceSegmentLength, endAngle } = calculateSegment(currentPercent.twice,75);

        const { segmentLength: onceSegmentLength } = calculateSegment(currentPercent.once,25);

        setSegmentLength({
            twice: twiceSegmentLength,
            once: onceSegmentLength,
        });

        setGreenEndAngle(endAngle);
    }, [currentPercent]);


    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
             <circle 
                cx="50"
                cy="50"
                r={radius}
                fill={mainColor}
                stroke="none"
            />
            <g  textAnchor="middle" dominantBaseline="middle" fill={VariantTitleColor} fontSize="13"  >
                <text
                    x="50" 
                    y="35" 
                >
                    in total
                </text>
                <text
                    x="50" 
                    y="50" 
                >
                    746
                </text>
                <text
                    x="50" 
                    y="65" 
                >
                    questions
                </text>
            </g>
            <circle 
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={CircularTrainerProgressBarColor}
                strokeWidth={strokeWidth}
            />
             <circle
                className={'ones'}  
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={OnceTwiceProgressOnesBackground}
                strokeWidth={strokeWidth}
                strokeDasharray={circleLength}
                strokeDashoffset={segmentLength.once}
                transform={`rotate(${greenEndAngle} 50 50)`} 
            />
            <circle
                className={'twice'} 
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={"#00BE5D"}
                strokeWidth={strokeWidth}
                strokeDasharray={circleLength}
                strokeDashoffset={segmentLength.twice}
                transform={`rotate(${270} 50 50)`} 
            />
           
        </svg>
    )
}
