import { useState, useRef, useEffect } from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
    newValue: (e: number) => void;
    currentProgressPercentage:number;
    isDraggingProgressBar:(e:boolean) => void
}
// { newValue }: ProgressBarProps
const ProgressBar = ({ currentProgressPercentage,newValue ,isDraggingProgressBar}: ProgressBarProps) => {

  const [value, setValue] = useState(0); 
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement | null>(null); 

//   useEffect(() => {
//     newValue(value / 100); 
//   }, [value]);
  useEffect(() => {
    isDraggingProgressBar(isDragging)
  }, [isDragging]);

useEffect(() => {
    if (isDragging) {
    //   console.log("value ProgressBar", value);
      newValue(value); 
    }
  }, [value, isDragging]);

  useEffect(() => {
    setValue(currentProgressPercentage); 
  }, [currentProgressPercentage]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && sliderRef.current) {
      const slider = sliderRef.current.getBoundingClientRect();
      let newLeft = e.clientX - slider.left;
      if (newLeft < 0) newLeft = 0;
      if (newLeft > slider.width) newLeft = slider.width;
      const newValue = Math.round((newLeft / slider.width) * 100);
      setValue(newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); 
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={styles.sliderContainer}>
      <div ref={sliderRef} className={styles.sliderTrack}>
        <div
          className={styles.sliderFilled}
          style={{ width: `${value}%` }} 
        ></div>
        <div
          className={styles.sliderThumb}
          style={{
            left: `${value}%`,
            transform: "translate(-50%, -50%)" 
          }}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
