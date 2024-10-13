import { useEffect, useState } from 'react';

interface ChartData {
  percentage: string;
}

interface Data {
  date: string;
  time: string;
  percentage: number;
}

interface Point {
  x: number;
  y: number;
}

interface GridLine {
  y: number;
  label: string;
}

const MockTestChart = ({ data }: { data: Data[] | null }) => {
  
  const defaultData: ChartData[] = [
    { percentage: '20%' },
    { percentage: '30%' },
    { percentage: '50%' },
    { percentage: '20%' },
    { percentage: '50%' },
    { percentage: '75%' },
    { percentage: '30%' },
    { percentage: '50%' },
    { percentage: '20%' },
    { percentage: '50%' },
    { percentage: '15%' },
    { percentage: '86%' },
    { percentage: '100%' },
  ];

  const [currentData, setCurrentData] = useState<ChartData[]>([]);
  const [percentages, setPercentages] = useState<ChartData[]>([]);
  const [lineLength, setLineLength] = useState(0);
  const [linePath, setLinePath] = useState('');
  const [progress, setProgress] = useState(0);

  const maxX = 300;
  const maxY = 100;

  const points: Point[] = [
    { x: 0, y: maxY }, 
    ...currentData.map((item, index) => {
      const x = ((index + 1) / currentData.length) * maxX;
      const y = maxY - parseInt(item.percentage);
      return { x, y };
    }),
  ];

  if (points.length > 1) {
    points[points.length - 1].x -= 2;
    points[points.length - 1].y += 2;
  }

  const gridLines: GridLine[] = [
    { y: maxY - 86, label: '86%' },
    { y: maxY - 75, label: '75%' },
    { y: maxY - 50, label: '50%' },
    { y: maxY - 25, label: '25%' },
  ];

  const smoothThreshold = 20;

  const generateVariableSmoothPath = (points: Point[]) => {
    if (points.length < 2) return '';
  
    let path = `M${points[0].x},${maxY}`;
  
    if (points.length > 2) {
      const firstPoint = points[1];
  
      path += ` L${firstPoint.x},${firstPoint.y}`;

      const secondPoint = points[2];
      const controlX1 = firstPoint.x + (secondPoint.x - firstPoint.x) / 3;
      const controlY1 = firstPoint.y;
      const controlX2 = secondPoint.x - (secondPoint.x - firstPoint.x) / 3;
      const controlY2 = secondPoint.y;
  
      path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${secondPoint.x},${secondPoint.y}`;
    } else {
      path += ` L${points[1].x},${points[1].y}`;
    }
  
    for (let i = 3; i < points.length; i++) {
      const curr = points[i - 1];
      const next = points[i];
      const diffY = Math.abs(next.y - curr.y);
  
      if (diffY < smoothThreshold) {
        path += ` L${next.x},${next.y}`;
      } else {
        const controlX1 = curr.x + (next.x - curr.x) / 3;
        const controlY1 = curr.y;
        const controlX2 = next.x - (next.x - curr.x) / 3;
        const controlY2 = next.y;
        path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${next.x},${next.y}`;
      }
    }
  
    return path;
  };
  
  

  useEffect(() => {
    if (data) {
      let currentData = data.map((element) => ({
        percentage: element.percentage + '%',
      }));
      setPercentages(currentData);
    }
  }, [data]);

  useEffect(() => {
    if (percentages.length === 0) {
      setCurrentData(defaultData);
    } else {
      setCurrentData(percentages);
    }
  }, [percentages]);

  useEffect(() => {
    const smoothPath = generateVariableSmoothPath(points);
    setLinePath(smoothPath);
  }, [points]);

  useEffect(() => {
    if (linePath) {
      const pathElement = document.querySelector('path');
      if (pathElement) {
        const length = pathElement.getTotalLength();
        setLineLength(length);
        setProgress(0);
      }
    }
  }, [linePath]);

  useEffect(() => {
    if (lineLength > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextValue = Math.min(prev + 2, lineLength);
          if (nextValue === lineLength) {
            clearInterval(interval);
          }
          return nextValue;
        });
      }, 10);

      return () => clearInterval(interval);
    }
  }, [lineLength]);

  if (currentData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <svg
      width="100%"
      height="350px"
      viewBox={`0 0 ${maxX} ${maxY + 1}`}
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
            stroke={data?.length !== 0  ? 'white' : '#7DC1E2'}
            strokeDasharray={line.label === '86%' ? 'none' : '3 3'}
            strokeWidth="0.5"
          />
          <text x="1" y={line.y - 2} fill={data?.length !== 0  ? 'white' : '#7DC1E2'} fontSize="3.5" textAnchor="start">
            {line.label}
          </text>
        </g>
      ))}

      <path
        d={linePath}
        stroke={data?.length !== 0 ? '#32EBC3' : '#12B9CB'}
        strokeWidth="0.5"
        fill="none"
        strokeDasharray={lineLength}
        strokeDashoffset={lineLength - progress}
      />

      {points.map((point, index) => (
        index !== 0 && (
          <circle key={index} cx={point.x} cy={point.y} r="0.8" fill={data?.length !== 0  ? 'white' : '#7DC1E2'} />
        )
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
        {data === null ? 'No results yet' : null}
      </text>
    </svg>
  );
};

export default MockTestChart;
