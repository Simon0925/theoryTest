import { useEffect, useState } from "react";

interface CircleTrainerProps{
    centerCirclebackgroundColor:string;
    progressColor:string;
    progressBarFill1Color:string;
    progressBarFill2Color:string;
    textColor:string;
    onesData: number | null;
    twiceData: number | null;
}

export default function CircleTrainer ({
    centerCirclebackgroundColor,
    progressColor,
    progressBarFill1Color,
    progressBarFill2Color,
    textColor,
    twiceData,
    onesData
}:CircleTrainerProps) {

    const strokeWidth = 12; 
    
    const radius = 50 - strokeWidth / 2; 
   
    const circleLength = 2 * Math.PI * radius;

    const [currentPercent, setCurrentPercent] = useState({
        once: 0,
        twice: 0,
      });

      const [segmentLength,setSegmentLength]= useState({
        once: circleLength,
        twice: circleLength,
      });
    
 

    const [greenEndAngle,setGreenEndAngle] = useState(0)

    const oncePercent =  typeof onesData === 'number' ?((onesData * 25) / 100)/100 : 0;

    const twicePercent =  typeof twiceData === 'number' ||twiceData === 0? ((twiceData * 75) / 100)/100 : 0;

  

    const onesSegmentLength = circleLength - (circleLength * oncePercent) ;
    const twiceSegmentLength =  Math.floor(circleLength  - (circleLength * twicePercent));

    
    const incrementPercenttwice = (
        delay: number,
        twicetarget: number,
        setCurrentPercent: React.Dispatch<React.SetStateAction<{ once: number; twice: number }>>
    ) => {
    
        const updateTwice = (currentValue: number) => {
            if (currentValue <= twicetarget) {
                setCurrentPercent((prev) => ({ ...prev, twice: currentValue}));
                setTimeout(() => updateTwice(currentValue + 1), delay);
            }
        };
        updateTwice(0); 
       
    };

    const incrementPercentOnce = (
        delay: number,
        onestarget: number,
        setCurrentPercent: React.Dispatch<React.SetStateAction<{ once: number; twice: number }>>
    ) => {
        const updateOnce = (currentValue: number) => {
            if (currentValue <= onestarget) {
                setCurrentPercent((prev) => ({ ...prev, once: currentValue}));
                setTimeout(() => updateOnce(currentValue + 1), delay);
            }
        }
        updateOnce(0)
    };

    useEffect(() => {
        if(typeof twiceData === 'number'&&typeof onesData === 'number' ){
            incrementPercenttwice(20,twiceData, setCurrentPercent);
            incrementPercentOnce(20,onesData, setCurrentPercent);
        }   
    }, [twiceData,onesData]);


    const progressBarTwice = () =>{
        const twicePercent = ((currentPercent.twice * 75) / 100)/100;
        const twiceSegmentLength =  circleLength  - (circleLength * twicePercent);
        setSegmentLength((prev) => ({ ...prev, twice: twiceSegmentLength}));
        setGreenEndAngle(270 + twicePercent * 360)

    }

    const progressBarOnce = () => {
        const oncePercent = ((currentPercent.once * 25) / 100) / 100;
        const onesSegmentLength = circleLength - (circleLength * oncePercent);
        setSegmentLength((prev) => ({ ...prev, once: onesSegmentLength })); 
    };
        
    useEffect(()=>{
        progressBarTwice()
        progressBarOnce()

    },[currentPercent.twice,currentPercent.once])


    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
             <circle 
                cx="50"
                cy="50"
                r={radius}
                fill={centerCirclebackgroundColor}
                stroke="none"
            />
            <g  textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize="13"  >
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
                stroke={progressColor}
                strokeWidth={strokeWidth}
            />
             <circle
                className={'ones'}  
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={progressBarFill1Color}
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
                stroke={progressBarFill2Color}
                strokeWidth={strokeWidth}
                strokeDasharray={circleLength}
                strokeDashoffset={segmentLength.twice}
                transform={`rotate(${270} 50 50)`} 
            />
           
        </svg>
    )
}
