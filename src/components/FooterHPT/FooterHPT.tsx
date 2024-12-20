import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./FooterHPT.module.scss"

interface FooterHPTProps {
    isIntroduction:(e:boolean) => void;
    isTestStart:(e:boolean) => void;

}


export default function FooterHPT ({isIntroduction,isTestStart}:FooterHPTProps) {

    const {HtpIntroductionBtnBackground,HtpIntroductionBtnTextColor} = useSelector((state: RootState) => state.color.themeData);
    const videos = useSelector((state: RootState) => state.hptData.videos);


    const start = () =>{
        videos.length !== 0 ?
        isTestStart(true)
        :null
    }


    return(
        <>
            <div className={styles.wrap}>
                <button style={{background:HtpIntroductionBtnBackground,color:HtpIntroductionBtnTextColor}} onClick={()=>isIntroduction(true)} className={styles.introduction}>
                    Introduction
                </button>
                <button onClick={start} className={styles.start}>
                    START
                </button>
            </div>
        </>
    )
}