import { useRef, useState, useEffect } from "react";
import styles from "./VideoPlayer.module.scss";
import PauseSvg from "../../SVG/PauseSvg/PauseSvg";
import PlayVectorSvg from "../../SVG/PlayVectorSvg/PlayVectorSvg";
import hostname from "../../config/hostname";
import NextForwardArrow from "../../SVG/NextForwardArrow/NextForwardArrow";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const updateProgress = () => {
    if (videoRef.current && progressRef.current) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressRef.current.style.width = `${percentage}%`;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <video
          ref={videoRef}
          onTimeUpdate={updateProgress}
          onLoadedMetadata={handleLoadedMetadata}
          className={styles.video}
          src={`${hostname}/video/introduction.mp4`}
        />
        <div className={styles.controlPanel}>
          <div className={styles.control}>
          <div className={styles.volumeControl}>
            <label htmlFor="volume"></label>
            <input
              type="range"
              id="volume"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
            <div className={styles.play}>
              <div onClick={togglePlayPause}>
                {isPlaying ? <PauseSvg /> : <PlayVectorSvg />}
              </div>
            </div>
            <NextForwardArrow />
          </div>
          
          <div className={styles.progress}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
            <div className={styles.progressBar}>
              <div className={styles.progress} ref={progressRef}>
                <div className={styles.slider}></div>
              </div>
            </div>
            <span className={styles.time}>{formatTime(duration - currentTime)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
