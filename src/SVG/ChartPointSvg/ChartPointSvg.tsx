import styles from './ChartPointSvg.module.scss';

interface ChartPointProps {
  x: number;
  y: number;
  fillColor: string;
  radius: number;
}

const ChartPointSvg = ({ x, y, fillColor, radius }: ChartPointProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle
        cx={0} 
        cy={0}
        r={radius}
        fill={fillColor}
        className={styles.wrap}
      />
    </g>
  );
};

export default ChartPointSvg;
