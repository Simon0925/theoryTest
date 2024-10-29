import { useEffect, useState } from "react";
import styles from "./Select.module.scss";
import OkVectorSvg from "../../SVG/OkVectorSvg/OkVectorSvg.tsx";
import { useVideo } from "../../context/VideoContext/VideoContext.tsx.tsx";

interface SelecteProps {
  selecteVisible: (e: boolean) => void;
  selectionVisible:(e:boolean) => void;
}

const Select = ({ selecteVisible,selectionVisible }: SelecteProps) => {
  const {
    setSelectedSpeed,
    selectedSpeed
} = useVideo();
  const [isVisible, setIsVisible] = useState(false);
  const speeds = ["0.5x", "1.0x", "1.25x", "1.5x", "2x"];

  useEffect(()=>{
    selectionVisible(isVisible)
  },[isVisible])


  const handleSpeedClick = (e: React.MouseEvent, speed: string) => {
    e.stopPropagation();
    setSelectedSpeed(speed);
    selecteVisible(false);
    setIsVisible(false);
  };

  const toggleDropdown = (status: boolean) => {
    setIsVisible(status);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest(`.${styles.wrap}`) &&
      !target.closest(`.${styles.selection}`)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => toggleDropdown(true)}
      onMouseLeave={() => toggleDropdown(false)}
    >
      <div className={styles.playback}>
        <div className={styles.playbackText}>
          <span>Playback Speed </span>
          <span>{">"}</span>
        </div>
      </div>
      {isVisible && (
        <div className={styles.selection}>
          {speeds.map((speed, index) => (
            <div onClick={(e) => handleSpeedClick(e, speed)} key={index} className={styles.row}>
              <span className={styles.vector}>{selectedSpeed === speed ? <OkVectorSvg /> : null}</span>
              <span className={styles.speed}>{speed}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
