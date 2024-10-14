import { useState, useRef, useEffect } from "react";
import styles from "./CustomSound.module.scss";

interface CustomSoundProps {
  newValue: (e: number) => void;
}

const CustomSound = ({ newValue }: CustomSoundProps) => {
  const [value, setValue] = useState(50); 
  const [isDragging, setIsDragging] = useState(false); 
  const sliderRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    newValue(value / 100); 
  }, [value]);

  const handleMouseDown = () => {
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

export default CustomSound;
