import { useState, useEffect } from 'react';
import styles from './TimerAssessment.module.scss';

interface TimerAssessment {
  pause: boolean;
}

export default function TimerAssessment({ pause }: TimerAssessment) {
  const [timeLeft, setTimeLeft] = useState(57 * 60);

  useEffect(() => {
    if (!pause && timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId); 
    }
  }, [pause, timeLeft]); 

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className={styles.timer}>
        {formatTime(timeLeft)}
      </div>
    </>
  );
}
