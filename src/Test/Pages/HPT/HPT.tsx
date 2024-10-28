import { useEffect, useState } from 'react';
import FooterHPT from '../../FooterHPT/FooterHPT';
import VideosSet from '../../VideosSet/VideosSet';
import styles from './HPT.module.scss';
import Introduction from '../../Introduction/Introduction';
import { hptGetData } from './servise/hptGetData';
import VideoTest from '../../VideoTest/VideoTest';
import CompletedVideos from '../../CompletedVideos/CompletedVideos';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

interface VideoData {
    id: string;
    poster: string;
    category: string; 
    video: string;
    stars: number;
}

export default function HPT() {
    const [isIntroduction, setIsIntroduction] = useState(false);
    const [testIsActive, setTestIsActive] = useState(false);
    const [completedVideosActive, setCompletedVideosActive] = useState(false);
    const [videosData, setVideosData] = useState<VideoData[]>([]);
    const color = useSelector((state: RootState) => state.color);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const videos = await hptGetData();
                setVideosData(videos); 
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        if (videosData.length === 0) fetchData();
    }, [videosData]);

    const renderVideosByCategory = (category: string) => (
        <div className={styles.videoContainer}>
            {videosData
                .filter((video) => video.category === category)
                .map((video, index) => (
                    <VideosSet
                        key={video.id}
                        poster={video.poster}
                        id={video.id}
                        video={video.video}
                        stars={video.stars}
                        numberOfVideo={index + 1}
                        completedVideos={false}
                    />
                ))}
        </div>
    );

    const renderMainView = () => (
        <div className={styles.wrap}>
            <div style={{background:color.HtpPlateBackground}}  className={styles.plate}>
                <p style={{color:color.HptTitleColorText}} >DVSA CGI videos</p>
            </div>
            {renderVideosByCategory("CGI")}
            <div style={{background:color.HtpPlateBackground}}  className={styles.plate}>
                <p style={{color:color.HptTitleColorText}} >DVSA non-CGI videos</p>
            </div>
            {renderVideosByCategory("non-CGI")}
            <footer>
                <FooterHPT isTestStart={setTestIsActive} isIntroduction={setIsIntroduction} />
            </footer>
        </div>
    );

    return (
        <>
            {!isIntroduction && !testIsActive && !completedVideosActive && renderMainView()}
            {completedVideosActive && !isIntroduction && !testIsActive && (
                <CompletedVideos
                    isIntroduction={setIsIntroduction} 
                    completedVideosActive={setCompletedVideosActive} 
                    testIsActive={setTestIsActive} 
                />
            )}
            {testIsActive && !isIntroduction && !completedVideosActive && (
                <VideoTest 
                    isIntroduction={setIsIntroduction} 
                    completedVideosActive={setCompletedVideosActive} 
                    exit={setTestIsActive} 
                />
            )}
            {isIntroduction && !testIsActive && !completedVideosActive && (
                <Introduction exit={setIsIntroduction} />
            )}
        </>
    );
}
