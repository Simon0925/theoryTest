import { useEffect, useMemo, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface CircularProgressBarProps {
    correct: number;
    skipped: number;
    incorrect: number;
    mockTest?: boolean | undefined;
  }


const CircularProgressBar= ({ correct, skipped, incorrect, mockTest }: CircularProgressBarProps) => {
  
  const color = useSelector((state: RootState) => state.color);
   
  const total = correct + incorrect + skipped;

  if (total === 0 || typeof total === 'undefined' || Number.isNaN(total)) {
    return <div>Total{total}</div>;
  }

  if (!color) {
    return null;
}
  const strokeWidth = 10;
  const radius = 50 - strokeWidth / 2;
  const circleLength = 2 * Math.PI * radius;

  const maxAngle = 268;
  const rotationStartAngle = 135;


  const percentages = useMemo(() => ({
    correct: (correct / total) * 100,
    incorrect: (incorrect / total) * 100,
    skipped: (skipped / total) * 100,
  }), [correct, incorrect, skipped, total]);

  

  const calculateSegment = (percent: number) => circleLength - (circleLength * (percent * 0.75)) / 100;

  const [animatedPercentages, setAnimatedPercentages] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
  });

  const animate = () => {
    const animationStart = { ...animatedPercentages };
    const duration = 1000; 
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimatedPercentages({
        correct: animationStart.correct + (percentages.correct - animationStart.correct) * progress,
        incorrect: animationStart.incorrect + (percentages.incorrect - animationStart.incorrect) * progress,
        skipped: animationStart.skipped + (percentages.skipped - animationStart.skipped) * progress,
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    animate();
  }, [percentages]);

  const segmentLengths = useMemo(() => ({
    correct: calculateSegment(animatedPercentages.correct),
    incorrect: calculateSegment(animatedPercentages.incorrect),
    skipped: calculateSegment(animatedPercentages.skipped),
  }), [animatedPercentages]);

  const endAngles = useMemo(() => ({
    incorrect: rotationStartAngle + (maxAngle * animatedPercentages.correct) / 100,
    skipped: rotationStartAngle + (maxAngle * (animatedPercentages.correct + animatedPercentages.incorrect)) / 100,
  }), [animatedPercentages.correct, animatedPercentages.incorrect]);

 
  const title = Math.round(percentages.correct) >= 88 ? "PASSED" : "FAILED";

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#00C65D"
        strokeDasharray={circleLength}
        strokeWidth={strokeWidth}
        transform={`rotate(${rotationStartAngle} 50 50)`}
        strokeDashoffset={segmentLengths.correct}
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#FF8174"
        strokeDasharray={circleLength}
        strokeWidth={strokeWidth}
        transform={`rotate(${endAngles.incorrect} 50 50)`}
        strokeDashoffset={segmentLengths.incorrect}
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke={color.OnceTwiceProgressOnesBackground}
        strokeDasharray={circleLength}
        strokeWidth={strokeWidth}
        transform={`rotate(${endAngles.skipped} 50 50)`}
        strokeDashoffset={segmentLengths.skipped}
      />

      <text
        x="50%"
        y={mockTest ? "35%" : "50%"}
        dominantBaseline="middle"
        textAnchor="middle"
        fontWeight="900"
        fontSize={mockTest ? "25" : "30"}
        fill={color.textColor}
      >
        {Math.round(percentages.correct)}%
      </text>

      {mockTest && (
        <text
          x="50"
          y="55"
          dominantBaseline="middle"
          textAnchor="middle"
          fontWeight="900"
          fontSize="15"
          fill={color.textColor}
        >
          {title}
        </text>
      )}
    </svg>
  );
};

export default CircularProgressBar;
