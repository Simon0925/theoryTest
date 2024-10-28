import { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react";


interface VideoContextType {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  togglePlayPause: () => void;
  volume: number;
  setVolume: (value: number) => void;
  currentTime: number;
  duration: number; 
  setDuration: (value: number) => void;
  progressPercentage: number;
  setProgressPercentage: (value: number) => void;
  selectedSpeed: string;
  setSelectedSpeed: (value: string) => void;
  skipTime: (direction: string) => void;
  newTime:number | null
  setNewTime: (value: number) => void;
  setIsDragging:(value:boolean) => void
  isDragging:boolean;
  handleLoadedMetadata:() => void;
 isControlPanelHovered:boolean;
  setIsControlPanelHovered:(value:boolean) => void;
  selectionVisible:boolean; 
  setSelectionVisible:(value:boolean) => void;
  isSpeed: boolean; 
  setIsSpeed:(value:boolean) => void;
  isVisible:boolean; 
  setIsVisible:(value:boolean) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); 
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [selectedSpeed, setSelectedSpeed] = useState("1.0x");
  const [newTime, setNewTime] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isControlPanelHovered, setIsControlPanelHovered] = useState(false);
  const [selectionVisible ,setSelectionVisible] = useState(false)
  const [isSpeed, setIsSpeed] = useState(false);
  const [isVisible, setIsVisible] = useState(true); 

  useEffect(() => {
    if (isDragging && videoRef.current) {
      const newTime = (progressPercentage / 100) * (videoRef.current.duration || 0);
      videoRef.current.currentTime = newTime;
    }
  }, [progressPercentage]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateProgress = () => {
        setCurrentTime(video.currentTime);
      };
      video.addEventListener("timeupdate", updateProgress);
      setDuration(video.duration);

      return () => {
        video.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  
  const handleVolumeChange = (volume:number) => {
    setVolume(volume); 
    if (videoRef.current) {
      videoRef.current.volume = volume; 
    }
  };

  useEffect(()=>{
    handleVolumeChange(volume)
  },[volume])
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing the video:", error);
      });
      setIsPlaying(true);
    }
  }, []);

  const togglePlayPause = () => {

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }

  };

  const skipTime = (direction: string) => {
    if (videoRef.current) {
      const timeAdjustment = direction === "forward" ? 3 : -3;
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + timeAdjustment, videoRef.current.duration));
      const currentProgressPercentage = (videoRef.current.currentTime * 100) / videoRef.current.duration
      setProgressPercentage(currentProgressPercentage)
    }
  };

  const setNewProgress = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = (value / 100) * duration; 
      setProgressPercentage(value);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isControlPanelHovered) {
        setIsVisible(false);
      }
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [isControlPanelHovered]);

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
 

  const value = {
    videoRef,
    isPlaying,
    togglePlayPause,
    volume,
    setVolume,
    currentTime,
    duration,
    setDuration, 
    progressPercentage,
    setProgressPercentage,
    selectedSpeed,
    setSelectedSpeed,
    skipTime,
    setCurrentTime,
    setNewProgress,
    isDragging,
    setIsDragging,
    newTime,
    setNewTime,
    handleLoadedMetadata,
    isControlPanelHovered, 
    setIsControlPanelHovered,
    selectionVisible ,
    setSelectionVisible,
    isSpeed, 
    setIsSpeed,
    isVisible, 
    setIsVisible,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};
