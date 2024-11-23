import styles from "./PracticeGroup.module.scss"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Flag from "../Flag/Flag";
import Spinner from "../../UI/Spinner/Spinner";
import Topic from "../Topic/Topic";
import { useEffect, useState } from "react";
import topicsMap from "./services/topicsMap";
import {getQuestionsTopics} from './services/getQuestionsTopics'
import useCookie from "../../hooks/useCookie";
import {TopicInterface} from "./interface";

export default function PracticeGroup () {
    const [loading, setLoading] = useState(true);
    const [questionsGroup, setQuestionsGroup] = useState<TopicInterface[]>([]);
    
    const color = useSelector((state: RootState) => state.color.themeData);

    const accessToken = useCookie('accessToken');


    useEffect(() => {
      if(accessToken){
        const fetchData = async () => {
          try {
            const groupTest = await getQuestionsTopics(accessToken);
            setQuestionsGroup(groupTest || []);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
    }, [accessToken]);

    return(
        <>
         <div style={{backgroundColor: color.questionsGroupBackground}} className={styles.wrap}>
                <Flag />
                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      height: "80vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Spinner />
                  </div> 
                ) : (
                  questionsGroup.map((elem) => {
                    const svg = topicsMap[elem.name] || null; 
                    return (
                      <Topic
                        key={elem.id}
                        id={elem.id}
                        name={elem.name}
                        quantity={elem.quantity}
                        percent={elem.percent}
                        svg={svg}
                      />
                    );
                  })
                )}
         </div>
        </>
    )
}