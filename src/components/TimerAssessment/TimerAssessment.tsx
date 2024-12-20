import { useState, useEffect } from 'react';
import styles from './TimerAssessment.module.scss';

interface TimerAssessmentProps {
  color:string;
  pause: boolean;
  fontSize:string;
  time:(e:number) => void;
}

export default function TimerAssessment({ pause,time,color,fontSize }: TimerAssessmentProps) {
  const [timeLeft, setTimeLeft] = useState(57 * 60);


  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (!pause && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0)); 
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [pause]); 

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    time(timeLeft)
  }, [timeLeft]); 

  return (
    <div style={{color:color,fontSize}} className={styles.timer}>
      {formatTime(timeLeft)}
    </div>
  );
}