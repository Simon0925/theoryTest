import styles from "./PracticeGroup.module.scss"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Flag from "../Flag/Flag";
import Spinner from "../../UI/Spinner/Spinner";
import Par from "../Par/Par";
import { useEffect, useState } from "react";
import parsMap from "./services/parsItem";
import {getQuestionsGroup} from './services/getQuestionsGroup'
import useCookie from "../../hooks/useCookie";
import {QuestionGroup} from "./interface";

export default function PracticeGroup () {
    const [loading, setLoading] = useState(true);
    const [questionsGroup, setQuestionsGroup] = useState<QuestionGroup[]>([]);
    
    const color = useSelector((state: RootState) => state.color.themeData);

    const accessToken = useCookie('accessToken');


    useEffect(() => {
      if(accessToken){
        const fetchData = async () => {
          try {
            const groupTest = await getQuestionsGroup(accessToken);
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
                    <Spinner color="#0078AB" />
                  </div> 
                ) : (
                  questionsGroup.map((elem) => {
                    const svg = parsMap[elem.name] || null; 
                    return (
                      <Par
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