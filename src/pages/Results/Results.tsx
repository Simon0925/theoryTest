import styles from "./Results.module.scss";
import OkVectorSvg from "../../SVG/OkVectorSvg/OkVectorSvg";
import CrossSvg from "../../SVG/CrossSvg/CrossSvg";
import { useState, useEffect } from "react";
import HeaderResults from "../../components/HeaderResults/HeaderResults";

import service from "../../service/service";

interface Result {
    questions: string;
    status: boolean;
}

export default function Results() {

    const [dataUpdate,setDataUpdate] = useState('')

    const localS = localStorage.getItem("result");

    const [data, setData] = useState<Result[]>([]);

    useEffect(() => {
        if (localS) {
            try {
                const parsedData = JSON.parse(localS);
                if (Array.isArray(parsedData)) {
                    setData(parsedData);
                } else {
                    setData([parsedData]);
                }
            } catch (error) {
                console.error("Error parsing local storage data:", error);
            }
        }
    }, [localS]);

    useEffect(()=>{
        console.log(dataUpdate)
    },[dataUpdate])

    useEffect(()=>{

      const getData = async () =>{

        try{
            const result = await service.getQuestionsGroup()
            
            const data = []

            // result.map(elem => data.push(elem.))
            
            console.log("result:",result)
            console.log("localS:",localS)
        }catch(error){
            console.log(error)
        }

      }

      getData()

    },[])

    return (
        <>
            <HeaderResults />
            <div className={styles['wrap']}>
                
                {data.length > 0 ? (
                    data.map((elem, index) => (
                        <div key={index} className={styles['variant']}>
                            <span>{elem.questions}</span>
                            <div className={styles['box']}>
                                {elem.status ? <OkVectorSvg /> : <CrossSvg />}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results available.</p>
                )}
            </div>
        </>
    );
}
