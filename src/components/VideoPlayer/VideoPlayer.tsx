import { useRef, useState, useEffect } from "react";
import styles from "./VideoPlayer.module.scss";
import PauseSvg from "../../SVG/PauseSvg/PauseSvg";
import PlayVectorSvg from "../../SVG/PlayVectorSvg/PlayVectorSvg";
import hostname from "../../config/hostname";
import NextForwardArrow from "../../SVG/NextForwardArrow/NextForwardArrow";
import SoundMaxSvg from "../../SVG/SoundMaxSvg/SoundMaxSvg";
import SoundOffSvg from "../../SVG/SoundOffSvg/SoundOffSvg";
import CustomSound from "../../UI/CustomSlider/CustomSound";
import ProgressBar from "../ProgressBar/ProgressBar";
import FastForwardSvg from "../../SVG/FastForwardSvg/FastForwardSvg";
import Selecte from "../Selecte/Selecte";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [wasPlayingBeforeDrag, setWasPlayingBeforeDrag] = useState(false);
  const [newTime, setNewTime] = useState<null | number>();
  const [isSpeed, setIsSpeed] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState("1.0x");
  const [isVisible, setIsVisible] = useState(true); // Control panel visibility
  const [isControlPanelHovered, setIsControlPanelHovered] = useState(false); // New state to track if the control panel is hovered

  useEffect(() => {
    if (newTime && videoRef.current) {
      const newV = (newTime / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newV;
    }
  }, [newTime]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = parseFloat(selectedSpeed);
    }
  }, [selectedSpeed]);

  useEffect(() => {
    if (isDragging && videoRef.current) {
      const newTime = (progressPercentage / 100) * (videoRef.current.duration || 0);
      videoRef.current.currentTime = newTime;
    }
  }, [isDragging, progressPercentage]);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

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

  useEffect(() => {
    if (isDragging) {
      if (isPlaying) {
        setWasPlayingBeforeDrag(true);
        videoRef.current?.pause();
        setIsPlaying(false);
      }
    } else {
      if (wasPlayingBeforeDrag) {
        videoRef.current?.play();
        setIsPlaying(true);
      }
      setWasPlayingBeforeDrag(false);
    }
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

  const skipTime = (direction: string) => {
    if (videoRef.current) {
      if (direction === "forward") {
        videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 3, videoRef.current.duration);
      } else if (direction === "backward") {
        videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 3, 0);
      }
    }
  };

  const handleMouseMove = () => {
    setIsVisible(true);
  };

  const handleControlPanelMouseEnter = () => {
    setIsControlPanelHovered(true);
    setIsVisible(true); 
  };

  const handleControlPanelMouseLeave = () => {
    setIsControlPanelHovered(false);
    if (!isVisible) {
      setIsVisible(false); 
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isControlPanelHovered && isVisible) {
        setIsVisible(false);
      }
    }, 3000); 
  
    return () => clearTimeout(timer);
  }, [isControlPanelHovered, isVisible]);



  return (
    <div 
      onMouseMove={handleMouseMove}
      className={styles.wrap}
    >
      <video
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
        onMouseDown={()=>setIsSpeed(false)}
        className={styles.video}
        src={`${hostname}/video/introduction.mp4`}
      />
      {isVisible && (
        <div
          onMouseEnter={handleControlPanelMouseEnter}
          onMouseLeave={handleControlPanelMouseLeave}
          className={styles.controlPanel}
        >
          <div className={styles.control}>
            <div className={styles.volumeControl}>
              <label htmlFor="volume">
                {volume > 0 ? <SoundMaxSvg volume={volume} /> : <SoundOffSvg />}
              </label>
              <CustomSound newValue={setVolume} />
            </div>
            <div className={styles.play}>
                <div className={styles.fastForward}>
                    <FastForwardSvg onClick={() => skipTime("backward")} transform={"rotate(180)"} />
                </div>
              <div className={styles.playBtn} onClick={togglePlayPause}>
                {isPlaying ? <PauseSvg /> : <PlayVectorSvg />}
              </div>
              <div className={styles.fastForward}>
                <FastForwardSvg onClick={() => skipTime("forward")} transform={"rotate(0)"} />
              </div>
            </div>
            <div className={styles.speed}>
              <NextForwardArrow click={() => setIsSpeed(!isSpeed)} state={isSpeed} />
              {isSpeed && <Selecte speed={selectedSpeed} getSpeed={setSelectedSpeed} selecteVisible={setIsSpeed} />}
            </div>
          </div>

          <div className={styles.progressPanel}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
            <ProgressBar
              newTime={setNewTime}
              isDraggingProgressBar={setIsDragging}
              newValue={setProgressPercentage}
              currentProgressPercentage={progressPercentage}
            />
            <span className={styles.time}>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
