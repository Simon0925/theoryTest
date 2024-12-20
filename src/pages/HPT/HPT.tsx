import { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import {useSelector } from 'react-redux';
import styles from './HPT.module.scss';
import { hptGetData } from './servise/hptGetData';
import { RootState } from '../../store/store';
import Spinner from '../../UI/Spinner/Spinner';
import GoToLogin from '../../components/GoToLogin/GoToLogin';
import useCookie from '../../hooks/useCookie';


const FooterHPT = lazy(() => import('../../components/FooterHPT/FooterHPT'));
const VideosSet = lazy(() => import('../../components/VideosSet/VideosSet'));
const VideoTest = lazy(() => import('../../components/VideoTest/VideoTest'));
const CompletedVideos = lazy(() => import('../../components/CompletedVideos/CompletedVideos'));
const Introduction = lazy(() => import('../../components/Introduction/Introduction'));

interface VideoData {
    id: string;
    poster: string;
    category: string;
    video: string;
    stars: number;
}

const HPT = () => {
    const [isIntroduction, setIsIntroduction] = useState(false);
    const [testIsActive, setTestIsActive] = useState(false);
    const [completedVideosActive, setCompletedVideosActive] = useState(false);
    const [videosData, setVideosData] = useState<VideoData[]>([]);

    const color = useSelector((state: RootState) => state.color.themeData);
    const auth = useSelector((state: RootState) => state.auth);

    const accessToken = useCookie('accessToken');


    const fetchData = useCallback(async () => {
        if (accessToken && videosData.length === 0) {
            try {
                const videos = await hptGetData(accessToken);
                setVideosData(videos);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        }
    }, [accessToken, videosData.length]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

 
    const renderVideosByCategory = useCallback((category: string) => (
        <div className={styles.videoContainer}>
            {videosData
                .filter(video => video.category === category)
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
    ), [videosData]);

    const renderMainView = () => (
        <div className={styles.wrap}>
            <div style={{ background: color.HtpPlateBackground }} className={styles.plate}>
                <p style={{ color: color.HptTitleColorText }}>DVSA CGI videos</p>
            </div>
            {renderVideosByCategory("CGI")}
            <div style={{ background: color.HtpPlateBackground }} className={styles.plate}>
                <p style={{ color: color.HptTitleColorText }}>DVSA non-CGI videos</p>
            </div>
            {renderVideosByCategory("non-CGI")}
            <footer>
                <FooterHPT isTestStart={setTestIsActive} isIntroduction={setIsIntroduction} />
            </footer>
        </div>
    );

    if (!auth.isLogin && !auth.loading) return <GoToLogin />;
    if (!auth.isLogin || auth.loading || videosData.length === 0) return (
        <div className={styles.spinner}>
            <Spinner />
        </div>
    );

    return (
        <Suspense fallback={<div className={styles.spinner}><Spinner /></div>}>
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
        </Suspense>
    );
};

export default HPT;
