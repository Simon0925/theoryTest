import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./CompletedVideos.module.scss";
import getResult from './services/getResult';
import VideosSet from "../VideosSet/VideosSet";
import Spinner from "../../UI/Spinner/Spinner";
import { resetVideo } from "../../store/hpt/hpt.slice";
import useCookie from "../../hooks/useCookie";
import  {VideoData,CompletedVideosProps} from './interface'


export default function CompletedVideos({
  isIntroduction,
  testIsActive,
  completedVideosActive,
}: CompletedVideosProps) {

    
  const [newResult, setNewResult] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const results = useSelector((state: RootState) => state.hptData.results);

  const accessToken = useCookie('accessToken');

  useEffect(() => {
    
    const fetchData = async (accessToken:string) => {
      setIsLoading(true);
      try {
        const data = await getResult(results,accessToken);
        setNewResult(data.data || []);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if(accessToken){
        fetchData(accessToken);
    }
  }, [results,accessToken]);

  const exitHandler = () => {
    isIntroduction(false);
    testIsActive(false);
    completedVideosActive(false);
    dispatch(resetVideo());
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.wrap}>
          <div className={styles.title}>
            <h4>Completed videos</h4>
          </div>
          <div className={styles.container}>
            {newResult.length > 0 ? (
              newResult.map((video, index) => (
                <VideosSet
                  key={`${video.id}-${index}`}
                  poster={video.poster}
                  id={video.id}
                  stars={video.stars}
                  numberOfVideo={index + 1}
                  completedVideos={true}
                />
              ))
            ) : (
              <p>No completed videos available</p>
            )}
          </div>
          <footer>
            <button onClick={exitHandler}>EXIT</button>
          </footer>
        </div>
      )}
    </>
  );
}
