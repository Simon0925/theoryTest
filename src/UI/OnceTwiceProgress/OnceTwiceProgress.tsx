import { useEffect, useState } from "react";
import CircleTrainer from "../CircleTrainer/CircleTrainer";
import styles from "./OnceTwiceProgress.module.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface OnceTwiceProgressProps {
  once: number | null;
  twice: number | null;
}

export default function OnceTwiceProgress({ once, twice }: OnceTwiceProgressProps) {
  
  const [correctDataFormat,setCorrectDataFormat] = useState({
    once:0,
    twice:0
  })

  const color = useSelector((state: RootState) => state.color);

  useEffect(() => {
    if (once === null || twice === null) return;

    let targetOnce = once < 1 ? 0 : Math.floor(once); 
    let targetTwice = twice < 1 ? 0 : Math.floor(twice); 

    const duration = 500; 
    const start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1); 

      setCorrectDataFormat({
        once: Math.round(targetOnce * progress),
        twice:Math.round(targetTwice * progress)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate); 
      }
    };

    requestAnimationFrame(animate); 
    return () => {};
  }, [once, twice]);

  return (
    <div className={styles["wrap"]}>
      <div style={{backgroundColor:color.OnceTwiceProgressOnesBackground}} className={styles["once"]}>
        <div className={styles["container"]}>
          <p className={styles["percent"]}>{correctDataFormat.once}%</p>
          <p className={styles["title"]}>once</p>
        </div>
      </div>
      <div className={styles["twice"]}>
        <div className={styles["container"]}>
          <p className={styles["percent"]}>{correctDataFormat.twice}%</p>
          <p className={styles["title"]}>twice</p>
        </div>
      </div>
      <div className={styles["circle"]}>
        <CircleTrainer colorCircle={color.OnceTwiceProgressOnesBackground} centerCircle={color.mainColor} textColor={color.VariantTitleColor} />
      </div>
    </div>
  );
}
