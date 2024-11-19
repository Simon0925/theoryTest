import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useMemo, useState } from "react";
import { defaultData } from "./service/defaultData";
import { GridLine,Data,ChartData } from "./interface";
import {generateVariableSmoothPath,calculateYPosition} from './service/chartUtils'

const MockTestChartTest = ({ data }: { data: Data[]}) => {
  const color = useSelector((state: RootState) => state.color);
  const [pathLength, setPathLength] = useState(0);
  const [currentData, setCurrentData] = useState<ChartData[]>([]);

  useEffect(() => {
      if (data.length > 0) {
        const updatedData = data.map((element) => ({
          percentage: element.percentage + '%',
        }));
        setCurrentData(updatedData);
      } else {
        setCurrentData(defaultData);
      }
  }, [data, defaultData]);


  const [dimensions, setDimensions] = useState({
    maxX: window.innerWidth,
    maxY: window.innerHeight * 0.45,
  });

  const gridLines: GridLine[] = useMemo(
    () => [
      { y: dimensions.maxY * 0.14, label: "86%" },
      { y: dimensions.maxY * 0.25, label: "75%" },
      { y: dimensions.maxY * 0.5, label: "50%" },
      { y: dimensions.maxY * 0.75, label: "25%" },
    ],
    [dimensions]
  );

  const currentPoints = useMemo(() => {
    const points = [{ x: 0, y: dimensions.maxY }];
    currentData.forEach((element, index) => {
      const check = currentData[currentData.length - 1];
      const percentage = parseInt(element.percentage)

      const x = check
        ? ((index + 1) / currentData.length) * dimensions.maxX - 10
        : ((index + 1) / currentData.length) * dimensions.maxX;
      const y = calculateYPosition(dimensions.maxY,percentage)
      points.push({ x, y });
    });
    return points;3
  }, [currentData,dimensions]);

  
  
  const pathD = useMemo(
    () => generateVariableSmoothPath(currentPoints, dimensions),
    [currentPoints, dimensions]
  );


  useEffect(() => {
    const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tempPath.setAttribute("d", pathD);
    document.body.appendChild(tempPath);
    setPathLength(tempPath.getTotalLength());
    document.body.removeChild(tempPath);
  }, [pathD]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        maxX: window.innerWidth,
        maxY: window.innerHeight * 0.3,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <svg
      min-width={dimensions.maxX}
      min-height={dimensions.maxY}
      viewBox={`0 0 ${dimensions.maxX} ${dimensions.maxY}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        background: data?.length !== 0? color.MockTestChartBackground :"",
      }}
    >

      {gridLines.map((line, index) => (
        <g key={index}>
          <line
            x1="0"
            y1={line.y}
            x2={dimensions.maxX}
            y2={line.y}
            stroke={
              data?.length !== 0 ? color.MockTestChartLabel : "#7DC1E2"
            }
            strokeDasharray={line.label === "86%" ? "none" : "3 3"}
            strokeWidth="2"
          />
          <text
            x="5"
            y={line.y - 5}
            fill={
              data?.length !== 0 ? color.MockTestChartLabel : "#7DC1E2"
            }
            fontSize="15"
            textAnchor="start"
          >
            {line.label}
          </text>
        </g>
      ))}

      <path
        d={pathD}
        fill="none"
        stroke={data?.length !== 0 ? color.MockTestChartLinePath : '#1AABB9'}
        strokeWidth="2"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          animation: "dash 2s linear forwards",
        }}
      />

      {currentPoints.map((point, index) => (
        index !== 0 && (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={data?.length !== 0 ? color.MockTestChartPoints : '#7DC1E2'}
          />
        )
      ))}

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <text
        x={dimensions.maxX / 2}
        y={dimensions.maxY / 2} 
        fill="white"
        fontSize="25"
        textAnchor="middle" 
        dominantBaseline="middle" 
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
      >
      {data?.length <= 0 ? 'No results yet' : null}
    </text>
    </svg>
  );
};

export default MockTestChartTest;
