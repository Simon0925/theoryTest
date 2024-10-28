import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './VideoTest.module.scss';
import hostname from '../../config/hostname';
import { useEffect, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import FlagSvg from '../../SVG/FlagSvg/FlagSvg';
import { addVideoResult, resetVideo } from '../../store/hpt/hpt.slice';
import VideoProgressCircle from '../../UI/CircularProgressVideoSvg/CircularProgressVideoSvg';

interface VideoTestProps {
    exit: (e: boolean) => void;
    completedVideosActive: (e: boolean) => void;
    isIntroduction: (e: boolean) => void;
}

const VideoTest = ({ exit, completedVideosActive, isIntroduction }: VideoTestProps) => {
    const dispatch = useDispatch();
    const videos = useSelector((state: RootState) => state.hptData.videos);
    const results = useSelector((state: RootState) => state.hptData.results);

    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [showExitModal, setShowExitModal] = useState<boolean>(false);
    const [countFlags, setCountFlags] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    

    const initializeResult = () => {
        const { id, poster } = videos[currentVideoIndex];
        if (!results.some(result => result.id === id)) {
            dispatch(addVideoResult({ id, poster }));
        }
    };

    useEffect(() => {
        if (videos.length > 0) initializeResult();
    }, [currentVideoIndex, videos.length]);

    const togglePlayPause = () => {
        if (videoRef.current) {
            isPlaying ? videoRef.current.pause() : videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnd = () => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(prevIndex => prevIndex + 1);
            setCountFlags(0);
        } else {
            endVideos();
        }
    };

    const endVideos = () => {
        exit(false);
        completedVideosActive(true);
        isIntroduction(false);
    };

    const handleExit = () => {
        dispatch(resetVideo());
        exit(false);
    };

    const addFlag = () => {
        setCountFlags(prev => prev + 1);
        const currentTime = videoRef.current?.currentTime?.toFixed(2);
        if (currentTime) {
            const { id, poster } = videos[currentVideoIndex];
            dispatch(addVideoResult({ id, time: currentTime, poster }));
        }
    };

    const toggleExitModal = () => {
        videoRef.current?.pause();
        setShowExitModal(!showExitModal);
    };

    const renderVideo = () => (
        <video
            onClick={addFlag}
            src={`${hostname}/${videos[currentVideoIndex].video}`}
            autoPlay
            onEnded={handleVideoEnd}
            ref={videoRef}
        />   
    );

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <button onClick={toggleExitModal}>Exit</button>
                    <span className={styles.quantity}>
                        <p>Video</p>
                        <p>{currentVideoIndex + 1}</p>
                        <p>of</p>
                        <p>{videos.length}</p>
                    </span>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? 'Pause' : 'Resume'}
                    </button>
                </div>
                <div className={styles.container}>
                    {videos.length > 0 ? renderVideo() : <p>No videos available</p>}
                </div>
                <div className={styles.FlagContainer}>
                    {Array.from({ length: countFlags }).map((_, index) => (
                        <FlagSvg key={index} color="white" width="35px" height="35px" />
                    ))}
                </div>
            </div>
            {showExitModal && (
                <Modal
                    close={handleExit}
                    text="Are you sure you want to exit from the test?"
                    title="Exit Test"
                    cancelClick={toggleExitModal}
                    cancel={true}
                    blueBtnText="Exit"
                />
            )}
        </>
    );
};

export default VideoTest;
