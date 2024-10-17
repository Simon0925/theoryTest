import { useCallback } from "react";
import styles from "./VideoPlayer.module.scss";

import hostname from "../../config/hostname";

import { useVideo } from "../../context/VideoContext/VideoContext.tsx";
import VideoControlPanel from "../VideoControlPanel/VideoControlPanel.tsx";


const VideoPlayer = () => {
    const {
        videoRef,
        handleLoadedMetadata,
        selectionVisible ,
        isSpeed, 
        setIsSpeed,
        isVisible, 
        setIsVisible,
    } = useVideo();
  
  
  const handleMouseMove = useCallback(() => {
    setIsVisible(true);
  }, []);


  return (
    <div 
      onMouseMove={handleMouseMove}
      className={styles.wrap}
      onClick={() => {
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
        <VideoControlPanel />
      )}
    </div>
  );
};

export default VideoPlayer;
