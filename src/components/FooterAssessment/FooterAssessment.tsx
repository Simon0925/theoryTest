import styles from "./FooterAssessment.module.scss";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AssessmentFooterDesktopButtons from "../AssessmentFooterDesktopButtons/AssessmentFooterDesktopButtons";
import { usePageNavigation } from "../../hooks/usePageNavigation";
import AssessmentFooterMobileButtons from "../AssessmentFooterMobileButtons/AssessmentFooterMobileButtons";


interface FooterAssessmentProps {
  statusPause: (e: boolean) => void;
  getTime: (e: number | undefined) => void;
  typeOftest: string;
  setReviewModal:(e:boolean) => void
}

export default function FooterAssessment({
  statusPause,
  getTime,
  typeOftest,
  setReviewModal,
}: FooterAssessmentProps) {
  
  const [pause, setPause] = useState(false);
  const [time, setTime] = useState<number | undefined>();

  const color = useSelector((state: RootState) => state.color.themeData);

  const { navigatePage, isModalVisible, setModalVisible } = usePageNavigation({typeOftest});
  
  useEffect(() => {
    getTime(time);
  }, [time]);

  const startPause = useCallback(() => {
    setPause(!pause);
    statusPause(!pause);
  }, [pause, statusPause]);

  useEffect(()=>{
    if(isModalVisible){
        setReviewModal(isModalVisible)
        setModalVisible(!isModalVisible)
    }
  },[isModalVisible])

  return (
    <div style={{ backgroundColor: color.headerColors }} className={styles.wrap}>
      <div className={styles.container}>
       <AssessmentFooterDesktopButtons
          navigatePage={navigatePage}
          typeOftest={typeOftest} 
          time={setTime}
          startPause={startPause}
          pause={pause}
       />
      </div>
      <div className={styles.mobileContainer} >
          <AssessmentFooterMobileButtons 
            navigatePage={navigatePage}
            typeOftest={typeOftest} 
            time={setTime}
            startPause={startPause}
            pause={pause}
          />
      </div>
      
    </div>
  );
}
