import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './VideoTest.module.scss';
import hostname from '../../config/hostname';
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import Modal from '../Modal/Modal';
import FlagSvg from '../../SVG/FlagSvg/FlagSvg';
import { addVideoResult, resetVideo } from '../../store/hpt/hpt.slice';

interface VideoTestProps {
    exit: (e: boolean) => void;
    completedVideosActive: (e: boolean) => void;
    isIntroduction: (e: boolean) => void;
}

const VideoTest = ({ exit, completedVideosActive, isIntroduction }: VideoTestProps) => {

    const dispatch = useDispatch();
    
    const { videos, results } = useSelector(
        (state: RootState) => ({ videos: state.hptData.videos, results: state.hptData.results }),
        shallowEqual
    );

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showExitModal, setShowExitModal] = useState(false);
    const [countFlags, setCountFlags] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const initializeResult = useCallback(() => {
        const { id, poster } = videos[currentVideoIndex];
        if (!results.some(result => result.id === id)) {
            dispatch(addVideoResult({ id, poster }));
        }
    }, [dispatch, currentVideoIndex, videos, results]);

    useEffect(() => {
        if (videos.length > 0) initializeResult();
    }, [initializeResult, videos.length]);

    const togglePlayPause = useCallback(() => {
        if (videoRef.current) {
            isPlaying ? videoRef.current.pause() : videoRef.current.play();
            setIsPlaying(prev => !prev);
        }
    }, [isPlaying]);

    const handleVideoEnd = () => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(prev => prev + 1);
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

    const handleExit = useCallback(() => {
        dispatch(resetVideo());
        exit(false);
    }, [dispatch, exit]);

    const addFlag = useCallback(() => {
        setCountFlags(prev => prev + 1);
        const currentTime = videoRef.current?.currentTime?.toFixed(2);
        if (currentTime) {
            const { id, poster } = videos[currentVideoIndex];
            dispatch(addVideoResult({ id, time: currentTime, poster }));
        }
    }, [currentVideoIndex, dispatch, videos]);

    const toggleExitModal = useCallback(() => {
        videoRef.current?.pause();
        setShowExitModal(prev => !prev);
    }, []);

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
                    {videos.length > 0 ? (
                        <video
                            onClick={addFlag}
                            src={`${hostname}/${videos[currentVideoIndex].video}`}
                            autoPlay
                            onEnded={handleVideoEnd}
                            ref={videoRef}
                        />
                    ) : (
                        <p>No videos available</p>
                    )}
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

export default memo(VideoTest);
