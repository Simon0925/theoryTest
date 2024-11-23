
import { shallowEqual, useSelector } from "react-redux";
import FlagSvg from "../../SVG/FlagSvg/FlagSvg";
import FooterButton from "../../UI/FooterButton/FooterButton";
import { RootState } from "../../store/store";
import { useChangeFlag } from "../../hooks/useChangeFlag";
import { useIsAnswerSelected } from "../../hooks/useIsAnswerSelected";
import styles from "./PracticeFooterMobileButtons.module.scss";
import ArrowPrevSmallSvg from "../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg";

interface PracticeFooterMobileButtonsProps {
  typeOftest:string;
  setIsExplanationVisible: (value: boolean) => void;
  navigatePage: (direction: 'previous' | 'next') => void; 
}

const PracticeFooterMobileButtons = ({ 
  typeOftest,
  setIsExplanationVisible,
  navigatePage
}:PracticeFooterMobileButtonsProps) => { 

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
                    color={questions[currentPage]?.flag ? color.FooterFlagMobileButton: color.FooterTextBtn}
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
                color={isAnswerSelected ? color.FooterColorNextBtnSelectedOption : color.FooterTextBtn}
                backgroundColor={isAnswerSelected ? color.FooterBackgroundNextBtnSelectedOption : color.FooterBackgroundBtn}
                svg={<ArrowPrevSmallSvg color={color.textColor}  width="30px" height="30px" /> }
                rotate={'180deg'}
                fontSize={'20px'}
            />
        </div>
    )
};

export default PracticeFooterMobileButtons;
