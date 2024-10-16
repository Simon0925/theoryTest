import {  useState, useEffect, useCallback } from "react";
import styles from "./VideoPlayer.module.scss";
import PauseSvg from "../../SVG/PauseSvg/PauseSvg";
import PlayVectorSvg from "../../SVG/PlayVectorSvg/PlayVectorSvg";
import hostname from "../../config/hostname";
import SoundMaxSvg from "../../SVG/SoundMaxSvg/SoundMaxSvg";
import SoundOffSvg from "../../SVG/SoundOffSvg/SoundOffSvg";
import CustomSound from "../../UI/CustomSound/CustomSound.tsx";
import ProgressBar from "../ProgressBar/ProgressBar";
import FastForwardSvg from "../../SVG/FastForwardSvg/FastForwardSvg";
import Selecte from "../Selecte/Selecte";
import NextForwardArrowSvg from "../../SVG/NextForwardArrowSvg/NextForwardArrow";
import { useVideo } from "../../context/VideoContext/VideoContext.tsx";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const VideoPlayer = () => {
    const {
        videoRef,
        isPlaying,
        togglePlayPause,
        volume,
        currentTime,
        duration,
        skipTime,
        newTime,
        selectedSpeed,
        handleLoadedMetadata
    } = useVideo();
  
  const [isSpeed, setIsSpeed] = useState(false);
  const [isVisible, setIsVisible] = useState(true); 
  const [isControlPanelHovered, setIsControlPanelHovered] = useState(false);
  const [selectionVisible ,setSelectionVisible] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = parseFloat(selectedSpeed);
    }
  }, [selectedSpeed]);

  useEffect(() => {
    if (newTime !== null && videoRef.current) {
      const newVideoTime = (newTime / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newVideoTime;
    }
  }, [newTime]);


  const handleMouseMove = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isControlPanelHovered) {
        setIsVisible(false);
      }
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [isControlPanelHovered]);



  return (
    <div 
      onMouseMove={handleMouseMove}
      className={styles.wrap}
      onClick={(e) => {
        if(isSpeed&&!selectionVisible){
            setIsSpeed(false)
        }
      }}
    >
      <video
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
        className={styles.video}
        src={`${hostname}/video/introduction.mp4`}
      />
      {isVisible && (
        <div
          onMouseEnter={() => setIsControlPanelHovered(true)}
          onMouseLeave={() => setIsControlPanelHovered(false)}
          className={styles.controlPanel}
        >
          <div className={styles.control}>
            <div className={styles.volumeControl}>
              <label htmlFor="volume">
                {volume > 0 ? <SoundMaxSvg volume={volume} /> : <SoundOffSvg />}
              </label>
              <CustomSound  />
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
              <NextForwardArrowSvg click={() => setIsSpeed(!isSpeed)} state={isSpeed} />
              {isSpeed && <Selecte selectionVisible={setSelectionVisible}  selecteVisible={setIsSpeed} />}
            </div>
          </div>
          <div className={styles.progressPanel}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
                <ProgressBar
            />
            <span className={styles.time}>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
