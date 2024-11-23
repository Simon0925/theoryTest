import { shallowEqual, useSelector } from "react-redux";
import FlagSvg from "../../SVG/FlagSvg/FlagSvg";
import FooterButton from "../../UI/FooterButton/FooterButton";
import { RootState } from "../../store/store";
import { useChangeFlag } from "../../hooks/useFooterHooks/useChangeFlag";
import { useIsAnswerSelected } from "../../hooks/useFooterHooks/useIsAnswerSelected";
import styles from "./AssessmentFooterMobileButtons.module.scss";
import ArrowPrevSmallSvg from "../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg";
import PlayVectorSvg from "../../SVG/PlayVectorSvg/PlayVectorSvg";
import PauseSvg from "../../SVG/PauseSvg/PauseSvg";
import TimerAssessment from "../TimerAssessment/TimerAssessment";


interface AssessmentFooterMobileButtonsProps {
    typeOftest:string;
    navigatePage: (direction: 'previous' | 'next') => void; 
    time:(e:number) => void;
    startPause:()=>void;
    pause:boolean;
}

const AssessmentFooterMobileButtons = ({ 
    typeOftest,
    navigatePage,
    time,
    startPause,
    pause
}:AssessmentFooterMobileButtonsProps) => { 

    const isAnswerSelected = useIsAnswerSelected(typeOftest);

    const { changeFlag } = useChangeFlag(typeOftest);

    const color = useSelector((state: RootState) => state.color.themeData);

    const { questions, currentPage } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
      );

    return(
        <div className={styles.wrap}>
            <FooterButton
                fontSize={'20px'}
                onClick={() => navigatePage('previous')}
                name="Prev"
                svg={<ArrowPrevSmallSvg color={color.textColor}  width="30px" height="30px" /> }
                color={color.FooterTextBtn}
                backgroundColor={color.FooterBackgroundBtn}
                opacity={currentPage > 0 ? '1':'0.5'}
            />
            <FooterButton
                onClick={changeFlag}
                name=""
                color={color.FooterTextBtn}
                backgroundColor={color.FooterBackgroundBtn}
                svg={ 
                <FlagSvg 
                    color={questions[currentPage]?.flag ?
                        color.FooterFlagMobileButton :
                        color.FooterTextBtn}
                    width="24px"
                    height="24px"
                />
                }
            />
            <TimerAssessment color={color.textColor} time={time} pause={pause} fontSize={"20px"} />
            <FooterButton
                onClick={startPause}
                name={""}
                svg={ 
                    pause ?  
                    <PlayVectorSvg color={color.FooterTextBtn} height={"20px"} width={"20px"} />
                        :
                    <PauseSvg color={color.FooterTextBtn} width={"20px"} height={"20px"} />
                }
                color={color.FooterTextBtn}
                backgroundColor={color.FooterBackgroundBtn}
                fontSize={'18px'}
            />
            <FooterButton
                onClick={() => navigatePage('next')}
                name2={questions.length === currentPage + 1 ? 'Results' : 'Next'}
                color={isAnswerSelected ?color.FooterBackgroundNextBtnSelectedOption: color.FooterTextBtn }
                backgroundColor={color.FooterBackgroundBtn}
                svg={<ArrowPrevSmallSvg
                    color={isAnswerSelected ?
                    color.FooterBackgroundNextBtnSelectedOption
                    : 
                    color.FooterTextBtn}
                    width="30px"
                    height="30px" /> 
                    }
                rotate={'180deg'}
                fontSize={'20px'}
            />
        </div>
    )
};

export default AssessmentFooterMobileButtons;

