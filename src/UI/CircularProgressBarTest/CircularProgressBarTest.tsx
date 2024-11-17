import { useCallback, useEffect, useMemo, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface CircularProgressBarProps {
  correct: number;
  skipped: number;
  incorrect: number;
  mockTest?: boolean | undefined;
}

const CircularProgressBarTest = ({ correct, skipped, incorrect, mockTest }: CircularProgressBarProps) => {
  const strokeWidth = 10;
  const radius = 50 - strokeWidth / 2;
  const circleLength = 2 * Math.PI * radius;

  const maxAngle = 268;
  const rotationStartAngle = 135;

  const total = correct + incorrect + skipped;

  
  if (total === 0) {
    return <svg></svg>;;
  }

  const color = useSelector((state: RootState) => state.color);

  const correctPercentage = useMemo(() => { return (correct / total) * 100;}, [correct, total]);

  const incorrectPercentage = useMemo(() => { return (incorrect / total) * 100;}, [correct, total]);
  const skippedPercentage = useMemo(() => { return (skipped / total) * 100;}, [skipped, total]);

  const [percentage, setPercentage] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
  });

  const [segmentLength, setSegmentLength] = useState({
    correct: circleLength,
    incorrect: circleLength,
    skipped: circleLength,
  });

  const [endAngle, setEndAngle] = useState({
    incorrect: 0,
    skipped: 0,
  });

  const calculateRotationAngle = (percent: number) => (percent / 100) * maxAngle;

  const calculateSegment = (percent: number) => {
    if (isNaN(percent) || percent < 0) return circleLength;
    const scaledPercent = (percent * 75) / 100 / 100;
    return circleLength - circleLength * scaledPercent;
};

    useEffect(() => {
    const correctEndAngle = rotationStartAngle;
    const incorrectEndAngle = correctEndAngle + calculateRotationAngle(percentage.correct);

    setSegmentLength({
        correct: calculateSegment(percentage.correct),
        incorrect: calculateSegment(percentage.incorrect),
        skipped: calculateSegment(percentage.skipped),
    });

    setEndAngle({
        incorrect: correctEndAngle + calculateRotationAngle(percentage.correct),
        skipped: incorrectEndAngle + calculateRotationAngle(percentage.incorrect),
    });
}, [percentage, rotationStartAngle]);


  const targets = {
    correct: correctPercentage,
    incorrect: incorrectPercentage,
    skipped: skippedPercentage,
  };


  const animate = (key: keyof typeof targets) => {
    let current = 0;
    const step = () => {
      if (current < targets[key]) {
        current += 1;
        setPercentage((prev) => ({ ...prev, [key]: current }));
        requestAnimationFrame(step);
      }
    };
    step();
  };


  useEffect(() => {
    animate("correct");
    animate("incorrect");
    animate("skipped");
  }, [correctPercentage, incorrectPercentage, skippedPercentage]);

  const title = Math.round(correctPercentage) >= 88 ? "PASSED" : "FAILED";

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
        strokeDashoffset={segmentLength.correct}
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#FF8174"
        strokeDasharray={circleLength}
        strokeWidth={strokeWidth}
        transform={`rotate(${endAngle.incorrect} 50 50)`}
        strokeDashoffset={segmentLength.incorrect}
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke={color.OnceTwiceProgressOnesBackground}
        strokeDasharray={circleLength}
        strokeWidth={strokeWidth}
        transform={`rotate(${endAngle.skipped} 50 50)`}
        strokeDashoffset={segmentLength.skipped}
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
        {Math.round(correctPercentage)}%
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

      <line stroke={color.textColor} x1="105" y1="53" x2="90" y2="51" />

      <text x="105" y="50" fontWeight="900" fontSize="10" fill={color.textColor}>
        PASS
      </text>
      <text x="105" y="60" fontWeight="900" fontSize="10" fill={color.textColor}>
        mark
      </text>
    </svg>
  );
};

export default CircularProgressBarTest;
