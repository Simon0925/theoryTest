import { useDispatch } from "react-redux";
import styles from "./Settings.module.scss";
import { updateColor } from '../../store/coolor/coolor.slise'; 


export default function Settings () {
    const dispatch = useDispatch();

    
    const changeColor = (value:string)=>{
    dispatch(updateColor(value));

    }

    return(
        <>
        <div className={styles.wrap}>
            <div className={styles.coolors}>
                <div onClick={() => changeColor("frostedPearl")}  className={styles.coolor1}></div>
                <div onClick={() => changeColor("amberSunset")}  className={styles.coolor2}></div>
                <div onClick={() => changeColor("oceanicBlue")}  className={styles.coolor3}></div>
                <div onClick={() => changeColor("violetMajesty")}  className={styles.coolor4}></div>
            </div>
        </div>
        </>
    )
}