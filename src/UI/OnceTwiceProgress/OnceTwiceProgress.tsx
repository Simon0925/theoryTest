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
  const color = useSelector((state: RootState) => state.color);

  const [currentPercent, setCurrentPercent] = useState({
    once: 0,
    twice: 0,
  });

  const incrementPercent = (
    delay: number,
    onesTarget: number,
    twiceTarget: number,
    setCurrentPercent: React.Dispatch<React.SetStateAction<{ once: number; twice: number }>>
  ) => {
    const updateTwice = () => {
      let currentValueTwice = 0;
      const intervalTwice = setInterval(() => {
        if (currentValueTwice < twiceTarget) {
          currentValueTwice += 1;
          setCurrentPercent((prev) => ({ ...prev, twice: currentValueTwice }));
        } else {
          clearInterval(intervalTwice);
        }
      }, delay);
    };

    const updateOnce = () => {
      let currentValueOnce = 0;
      const intervalOnce = setInterval(() => {
        if (currentValueOnce < onesTarget) {
          currentValueOnce += 1;
          setCurrentPercent((prev) => ({ ...prev, once: currentValueOnce }));
        } else {
          clearInterval(intervalOnce);
        }
      }, delay);
    };
    updateTwice();
    updateOnce();
  };

  useEffect(() => {
    if (typeof once === "number" && typeof twice === "number") {
      incrementPercent(100, once, twice, setCurrentPercent);
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
          centerCirclebackgroundColor={color.mainColor}
          progressColor={color.CircularTrainerProgressBarColor}
          progressBarFill2Color={"#00BE5D"}
          progressBarFill1Color={color.OnceTwiceProgressOnesBackground}
          textColor={color.VariantTitleColor}
          twiceData={20}
          onesData={100}
        />
      </div>
    </div>
  );
}
