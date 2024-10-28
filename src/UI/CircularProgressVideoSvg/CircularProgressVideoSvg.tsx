import React, { useState, useEffect, RefObject } from 'react';

interface VideoProgressCircleProps {
  videoProgress: number;
}

const VideoProgressCircle: React.FC<VideoProgressCircleProps> = ({ videoProgress }) => {
  const [progress, setProgress] = useState(0);

  const radius = 50;
  const stroke = 15;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    setProgress(videoProgress)
  }, [videoProgress]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width="100%" height="100%" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="rgba(255, 245, 245, 0.4"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="rgba(255, 245, 245, 0.7"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{ transition: 'stroke-dashoffset 0.1s ease' }}
      />
    </svg>
  );
};

export default VideoProgressCircle;
