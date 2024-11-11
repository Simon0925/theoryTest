import styles from "./PracticeGroup.module.scss"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Flag from "../Flag/Flag";
import Spinner from "../../UI/Spinner/Spinner";
import Par from "../Par/Par";
import { useEffect, useState } from "react";
import parsMap from "./service/parsItem";



import {getQuestionsGroup} from './service/getQuestionsGroup'
import useUserId from "../../hooks/useUserId";

interface QuestionGroup {
    name: string;
    quantity: number;
    percent: number;
    id: string;
  }



export default function PracticeGroup () {
    const [loading, setLoading] = useState(true);
    const [questionsGroup, setQuestionsGroup] = useState<QuestionGroup[]>([]);
    const color = useSelector((state: RootState) => state.color);
    const userId = useUserId();


    useEffect(() => {
      if(userId){
        const fetchData = async () => {
          try {
            const groupTest = await getQuestionsGroup(userId);
            setQuestionsGroup(groupTest || []);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
      }, [userId]);

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