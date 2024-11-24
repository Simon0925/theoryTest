import { shallowEqual, useSelector } from "react-redux";
import FlagSvg from "../../SVG/FlagSvg/FlagSvg";
import FooterButton from "../../UI/FooterButton/FooterButton";
import { RootState } from "../../store/store";
import { useChangeFlag } from "../../hooks/useFooterHooks/useChangeFlag";
import { useIsAnswerSelected } from "../../hooks/useIsAnswerSelected";
import styles from "./TrainerFooterMobileButtons.module.scss";
import ArrowPrevSmallSvg from "../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg";



interface TrainerFooterMobileButtonsProps {
    typeOftest:string;
    setIsExplanationVisible: (value: boolean) => void;
    navigatePage: (direction: 'previous' | 'next') => void; 
}

const TrainerFooterMobileButtons = ({ 
    typeOftest,
    setIsExplanationVisible,
    navigatePage
}:TrainerFooterMobileButtonsProps) => { 

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
            <FooterButton
                onClick={() => setIsExplanationVisible(true)}
                name="?"
                color={color.FooterTextBtn}
                backgroundColor={color.FooterBackgroundBtn}
                fontSize={'24px'}
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

export default TrainerFooterMobileButtons;

