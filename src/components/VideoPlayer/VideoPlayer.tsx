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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);


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
    if (videoRef.current && !isDragging) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgressPercentage(percentage);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };


  const handleProgressClick = (e: React.MouseEvent) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
      const newTime = percentage * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgressPercentage(percentage * 100);
      setCurrentTime(newTime);
    }
  };


  const handleMouseDown = () => {
    setIsDragging(true);
  };


  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      console.log("offsetX:",offsetX)
      const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
      const newTime = percentage * duration;
      setProgressPercentage(percentage * 100);
      setCurrentTime(newTime);
    }
  };


  const handleMouseUp = () => {
    setIsDragging(false);
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
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


  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", updateProgress);
      return () => {
        video.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <video
        ref={videoRef}
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

        <div className={styles.progressPanel}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <div
            className={styles.progressBar}
            ref={progressBarRef}
            onClick={handleProgressClick}
          >
            <div className={styles.progress} style={{ width: `${progressPercentage}%` }}>
              <div
                className={styles.slider}
                onMouseDown={handleMouseDown}
                style={{ transform: `translateX(calc(${progressPercentage}%))` }}
              />
            </div>
          </div>
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
