import { useEffect, useState } from "react"
import FlagSvg from "../../SVG/FlagSvg/FlagSvg"
import styles from "./Flag.module.scss"
import service from "../../service/service"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import idUser from "../../config/idUser"

export default function Flag () {

    
    const currentQuestions = useSelector((state: RootState) => state.practice.currentQuestions);

    const [active,setActive] = useState(false)

    const [selected,setSelected] = useState(false)

    const [currentFlags, setCurrentFlags] = useState({
        quantity:0,
        questions:[]
    }) 

    useEffect(()=>{
        if(selected){
            console.log("currentQuestions:",currentQuestions)
        }
    },[selected,currentQuestions])

    useEffect(()=>{

        if(currentFlags.quantity > 0){
            setActive(true)
        }else{
            setActive(false)
        }

    },[currentFlags])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const groupTest = await service.getFlags(idUser);
            setCurrentFlags({
                quantity : groupTest.quantity,
                questions: groupTest.questions
            });
          } catch (error) {
            console.error("Error fetching data in useEffect:", error);
          }
        };
        fetchData();
      }, []);
    
    const marker = () => {
        setSelected(!selected)
    }

    return(
        <>
        <div onClick={marker} className={styles['flag']}>
            <div className={styles.title}>
                <div className={selected ? styles.active : styles.notActive}>
                    <FlagSvg color={active ?"#FE8000"  :"#FFCDA8"} width={"50px"} height={"50px"} />
                </div>
                <span style={{ color: active ? "#FE8000" : "#FFCDA8" }}> 
                    Flagged questions
                </span>
            </div>
            <span className={active? styles['quantityActive'] : styles['quantityNotActive']  }>{currentFlags.quantity}</span>
        </div>
        </>
    )
}