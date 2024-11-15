interface CircularProgressBarProps {
  correct: number;
  skipped: number;
  incorrect: number;
  mockTest?: boolean | undefined;
  colorText:string;
}

const CircularProgressBar = ({ correct, skipped, incorrect,mockTest,colorText }: CircularProgressBarProps) => {
  
  const total = correct + incorrect + skipped;

  if (total === 0) {
    return null
  }

  const correctPercentage = (correct / total) * 100;
  const skippedPercentage = (skipped / total) * 100;
  const incorrectPercentage = (incorrect / total) * 100;

  const circleLength = 2 * Math.PI * 15.9155;

  const gapLength = circleLength * 0.25; 
  const visibleCircleLength = circleLength - gapLength;

  const correctLength = (correctPercentage / 100) * visibleCircleLength;
  const incorrectLength = (incorrectPercentage / 100) * visibleCircleLength;
  const skippedLength = (skippedPercentage / 100) * visibleCircleLength;

  const startOffset = -circleLength * 0.25; 

  const correctOffset = startOffset;
  const incorrectOffset = correctOffset - correctLength;
  const skippedOffset = incorrectOffset - incorrectLength;

  const title = Math.round(correctPercentage) >= 88 ? "PASSED" : "FAILED";
 
  return (
    <svg width="350" height="250" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
      <circle
        r="15.9155"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#00C65D"
        strokeWidth="4"
        strokeDasharray={`${correctLength} ${circleLength}`}
        strokeDashoffset={correctOffset}
        transform="rotate(45 21 21)" 
      />

      <circle
        r="15.9155"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#FF8174"
        strokeWidth="4"
        strokeDasharray={`${incorrectLength} ${circleLength}`}
        strokeDashoffset={incorrectOffset}
        transform="rotate(45 21 21)" 
      />

      <circle
        r="15.9155"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#0078AB"
        strokeWidth="4"
        strokeDasharray={`${skippedLength} ${circleLength}`}
        strokeDashoffset={skippedOffset}
        transform="rotate(45 21 21)" 
      />
    
      <text x="50%" y={mockTest ? "35%" : "50%"} dominantBaseline="middle" textAnchor="middle" fontWeight="900" fontSize={mockTest ? "8" : "10" } fill={colorText}>
        {Math.round(correctPercentage)}%
      </text>


      {mockTest &&  (
         <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontWeight="900" fontSize="6" fill={colorText}>
          {title}
       </text>
      )}
     
      <text x="40" y="22" fontWeight="900" fontSize="3.5" fill={colorText}>PASS</text>
      <text x="40" y="26" fontWeight="900" fontSize="3.5" fill={colorText}>mark</text>
    </svg>
  );
};

export default CircularProgressBar;
