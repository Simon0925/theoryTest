import { useDispatch, useSelector } from "react-redux";
import hostname from "../../config/hostname";
import { RootState } from "../../store/store";
import Stars from "../Stars/Stars";
import styles from "./VideosSet.module.scss";
import { addVideo, removeVideo } from "../../store/hpt/hpt.slice";
import { useState } from "react";

interface VideosSetProps {
    numberOfVideo: number;
    id: string;
    video?: string;
    poster: string;
    stars: number;
    completedVideos: boolean;
}

export default function VideosSet({
    completedVideos,
    numberOfVideo,
    id,
    video,
    poster,
    stars,
}: VideosSetProps) {
    const dispatch = useDispatch();
    const videos = useSelector((state: RootState) => state.hptData.videos);
    const [isActive, setIsActive] = useState(false);
    const themeData = useSelector((state: RootState) => state.color.themeData);
    const [loaded, setLoaded] = useState(false); 
    
    const toggleVideoForTest = () => {
        if (completedVideos || !video) return;

        const isVideoAdded = videos.some((v) => v.id === id);
        if (isVideoAdded) {
            dispatch(removeVideo(id));
        } else {
            dispatch(addVideo({ id, video, poster }));
        }
        setIsActive(!isVideoAdded);
    };

    return (
        <div onClick={toggleVideoForTest} className={styles.wrap}>
            <div className={styles.videoPicture}>
                <img
                    className={isActive ? styles.videoActive : loaded ? styles.loaded : styles.loading}
                    src={`${hostname}/${poster}`}
                    alt="Video Thumbnail"
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                />
                <div style={{background:themeData.HtpIconNumberBackground}} className={styles.number}>{numberOfVideo}</div>
                {stars > 0 && <Stars starColor={stars} />}
            </div>
        </div>
    );
}
