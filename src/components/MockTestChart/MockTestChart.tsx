import React, { useEffect, useState } from 'react';

interface ChartData {
  percentage: string;
}

interface Point {
  x: number;
  y: number;
}

interface GridLine {
  y: number;
  label: string;
}

const MockTestChart = ({ data }: { data: ChartData[] }) => {
  const [linePath, setLinePath] = useState('');
  const [progress, setProgress] = useState(0);

  const maxX = 300; 
  const maxY = 100; 

  
  const points: Point[] = data.map((item, index) => {
    const x = (index / (data.length - 1)) * maxX; 
    const y = maxY - parseInt(item.percentage);   
    return { x, y };
  });

  const gridLines: GridLine[] = [
    { y: 20, label: '86%' },   
    { y: 50, label: '75%' },   
    { y: 60, label: '50%' },   
    { y: 80, label: '25%' },  
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 1) {
        setProgress((prev) => Math.min(prev + 0.01, 1)); 
      }
    }, 30);

    return () => clearInterval(interval);
  }, [progress]);


  useEffect(() => {
    if (progress > 0) {
      const totalLength = points.length - 1;
      const currentIndex = Math.floor(progress * totalLength);
      const nextIndex = currentIndex + 1;

      const currentPoint = points[currentIndex];
      const nextPoint = points[nextIndex] || points[points.length - 1];

      const segmentProgress = (progress * totalLength) - currentIndex;

      const interpolatedX = currentPoint.x + (nextPoint.x - currentPoint.x) * segmentProgress;
      const interpolatedY = currentPoint.y + (nextPoint.y - currentPoint.y) * segmentProgress;

      let path = `M${points[0].x},${points[0].y}`;
      for (let i = 1; i <= currentIndex; i++) {
        path += ` L${points[i].x},${points[i].y}`;
      }
      path += ` L${interpolatedX},${interpolatedY}`;

      setLinePath(path);
    }
  }, [progress, points]);

  if (!data || data.length === 0) {
    return <div>No data available</div>; 
  }

  return (
    <svg
      width="100%"
      height="350px"
      viewBox={`0 0 ${maxX} ${maxY + 20}`} 
      preserveAspectRatio="none"
      style={{
        background: 'linear-gradient(180deg, rgba(57,195,245,0.6125043767507004) 0%, rgba(0,150,206,1) 96%)',
      }}

    >

      {gridLines.map((line, index) => (
        <g key={index}>
          <line
            x1="0"
            y1={line.y}
            x2={maxX}
            y2={line.y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeDasharray={line.label === '86%' ? 'none' : '3 3'}
          />
          <text
            x="1"
            y={line.y - 2}
            fill="#7DC1E2"
            fontSize="3.5"
            textAnchor="start"
          >
            {line.label}
          </text>
        </g>
      ))}
     
          
      <path d={linePath} stroke="#12B9CB" strokeWidth="1" fill="none" />

      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="1"
          fill="#7DC1E2"
        />
      ))}
        <text
        x={130}
        y={50}
        fill="white"
        fontSize="6"
        textAnchor="start"
        fontFamily="Arial, Helvetica, sans-serif" 
        fontWeight="900" 
             >
        {"No results yet"}
        </text>
    </svg>
  );
};

export default MockTestChart;
