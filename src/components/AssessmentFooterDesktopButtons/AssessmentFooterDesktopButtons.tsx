
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useChangeFlag } from "../../hooks/useFooterHooks/useChangeFlag";
import { useIsAnswerSelected } from "../../hooks/useIsAnswerSelected";
import styles from "./AssessmentFooterDesktopButtons.module.scss";

import ButtonTest from "../../UI/ButtonTest/ButtonTest";
import TimerAssessment from "../TimerAssessment/TimerAssessment";

interface AssessmentFooterDesktopButtonsProps {
  typeOftest:string;
  navigatePage: (direction: 'previous' | 'next') => void; 
  time:(e:number) => void;
  startPause:()=>void;
  pause:boolean;
}

const AssessmentFooterDesktopButtons = ({ 
  typeOftest,
  navigatePage,
  time,
  startPause,
  pause
}:AssessmentFooterDesktopButtonsProps) => { 



    const isAnswerSelected = useIsAnswerSelected(typeOftest);

    const { changeFlag } = useChangeFlag(typeOftest);

    const color = useSelector((state: RootState) => state.color.themeData);

    const { questions, currentPage } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
      );

 
    return(
        <div className={styles.wrap}>
          <div style={{opacity:currentPage > 0 ? "1":"0.5"}} >
            <ButtonTest
            click={() => navigatePage('previous')}
            name="< Previous"
            color={color.FooterTextBtnDesktop}
            backgroundColor={color.FooterBackgroundBtnDesktop}
            />
          </div>   
            <ButtonTest
            click={changeFlag}
            name=""
            color={color.FooterTextBtnDesktop}
            backgroundColor={color.FooterBackgroundBtnDesktop}
            svg
            svgColor={questions[currentPage]?.flag? true : color.FlagColorSvgBtn}
            />
            <TimerAssessment color={color.textColor} time={time} pause={pause} fontSize={"24px"} />
            <ButtonTest
                click={startPause}
                name={pause ? "Resume" : "Pause"}
                color={color.FooterTextBtnDesktop}
                backgroundColor={color.FooterBackgroundBtnDesktop}
            />
            <ButtonTest
                click={() => navigatePage('next')}
                name={questions.length === currentPage + 1 ? 'Results' : 'Next >'}
                color={isAnswerSelected ? color.FooterColorNextBtnSelectedOption : color.FooterTextBtnDesktop}
                backgroundColor={isAnswerSelected ? color.FooterBackgroundNextBtnSelectedOption : color.FooterBackgroundBtnDesktop}
            />
        </div>
    )
};

export default AssessmentFooterDesktopButtons;
;
