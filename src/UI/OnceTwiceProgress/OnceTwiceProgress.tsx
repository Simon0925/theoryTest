import { useEffect, useState } from "react";
import styles from "./OnceTwiceProgress.module.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import CircleTrainer from "../CircleTrainer/CircleTrainer";

interface OnceTwiceProgressProps {
  once: number | null;
  twice: number | null;
}

export default function OnceTwiceProgress({ once, twice }: OnceTwiceProgressProps) {
  const color = useSelector((state: RootState) => state.color);

  const [currentPercent, setCurrentPercent] = useState({
    once: 0,
    twice: 0,
  });


  const incrementPercent = (delay: number, targets: { once: number; twice: number }) => {
    const updatePercent = (target: number, key: 'once' | 'twice') => {
      let currentValue = 0;
      const interval = setInterval(() => {
        if (currentValue < target) {
          currentValue += 1;
          setCurrentPercent((prev) => ({ ...prev, [key]: currentValue }));
        } else {
          clearInterval(interval);
        }
      }, delay);
    };

    updatePercent(targets.once, 'once');
    updatePercent(targets.twice, 'twice');
  };

  useEffect(() => {
    if (typeof once === "number" && typeof twice === "number") {
      incrementPercent(100, { once, twice });
    }
  }, [once, twice]);

  return (
    <div className={styles["wrap"]}>
      <div
        style={{ backgroundColor: color.OnceTwiceProgressOnesBackground }}
        className={styles["once"]}
      >
        <div className={styles["container"]}>
          <p className={styles["percent"]}>{currentPercent.once}%</p>
          <p className={styles["title"]}>once</p>
        </div>
      </div>
      <div className={styles["twice"]}>
        <div className={styles["container"]}>
          <p className={styles["percent"]}>{currentPercent.twice}%</p>
          <p className={styles["title"]}>twice</p>
        </div>
      </div>
      <div className={styles["circle"]}>
        <CircleTrainer
          twiceData={twice}
          onesData={once}
        />
      </div>
    </div>
  );
}
