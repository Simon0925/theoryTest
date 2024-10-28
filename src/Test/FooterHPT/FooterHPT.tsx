import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./FooterHPT.module.scss"

interface FooterHPTProps {
    isIntroduction:(e:boolean) => void;
    isTestStart:(e:boolean) => void;
}


export default function FooterHPT ({isIntroduction,isTestStart}:FooterHPTProps) {

    const color = useSelector((state: RootState) => state.color);


    const start = () =>{
        isTestStart(true)
    }


    return(
        <>
            <div className={styles.wrap}>
                <button style={{background:color.HtpIntroductionBtnBackground,color:color.HtpIntroductionBtnTextColor}} onClick={()=>isIntroduction(true)} className={styles.introduction}>
                    Introduction
                </button>
                <button onClick={start} className={styles.start}>
                    START
                </button>
            </div>
        </>
    )
}