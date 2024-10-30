
import styles from "./VideoControlPanel.module.scss";

import PauseSvg from "../../SVG/PauseSvg/PauseSvg.tsx";
import PlayVectorSvg from "../../SVG/PlayVectorSvg/PlayVectorSvg.tsx";
import SoundMaxSvg from "../../SVG/SoundMaxSvg/SoundMaxSvg.tsx";
import SoundOffSvg from "../../SVG/SoundOffSvg/SoundOffSvg.tsx";
import CustomSound from "../../UI/CustomSound/CustomSound.tsx";
import ProgressBar from "../ProgressBar/ProgressBar.tsx";
import FastForwardSvg from "../../SVG/FastForwardSvg/FastForwardSvg.tsx";
import Selecte from "../Selecte/Selecte.tsx";
import NextForwardArrowSvg from "../../SVG/NextForwardArrowSvg/NextForwardArrow.tsx";
import { useVideo } from "../../context/VideoContext/VideoContext.tsx.tsx";

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

const VideoControlPanel = () => {

    const {
        isPlaying,
        togglePlayPause,
        volume,
        currentTime,
        duration,
        skipTime,
        setIsControlPanelHovered,
        setSelectionVisible,
        isSpeed, 
        setIsSpeed,
    } = useVideo();

    return (
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
    );
};

export default VideoControlPanel;