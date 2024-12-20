
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useChangeFlag } from "../../hooks/useFooterHooks/useChangeFlag";
import { useIsAnswerSelected } from "../../hooks/useIsAnswerSelected";
import styles from "./PracticeFooterDesktopButtons.module.scss";

import ButtonTest from "../../UI/ButtonTest/ButtonTest";

interface PracticeFooterDesktopButtonsProps {
  typeOftest:string;
  setIsExplanationVisible: (value: boolean) => void;
  navigatePage: (direction: 'previous' | 'next') => void; 
}

const PracticeFooterDesktopButtons = ({ 
  typeOftest,
  setIsExplanationVisible,
  navigatePage
}:PracticeFooterDesktopButtonsProps) => { 

    const isAnswerSelected = useIsAnswerSelected(typeOftest);

    const { changeFlag } = useChangeFlag(typeOftest);

    const color = useSelector((state: RootState) => state.color.themeData);

    const { questions, currentPage } = useSelector(
        (state: RootState) => state.currentData.testsData[typeOftest],
        shallowEqual
      );

      const nextBtnName = (() => {
        if (questions.length === currentPage + 1) {
          return typeOftest === 'Result' ? 'Back' : 'Results';
        }
        return 'Next >';
      })();

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
            <ButtonTest
            click={() => setIsExplanationVisible(true)}
            name="Explanation"
            color={color.FooterTextBtnDesktop}
            backgroundColor={color.FooterBackgroundBtnDesktop}
            />
            <ButtonTest
            click={() => navigatePage('next')}
            name={nextBtnName}
            color={isAnswerSelected ? color.FooterColorNextBtnSelectedOption : color.FooterTextBtnDesktop}
            backgroundColor={isAnswerSelected &&typeOftest !== 'Result' ? color.FooterBackgroundNextBtnSelectedOption : color.FooterBackgroundBtnDesktop}
            />
        </div>
    )
};

export default PracticeFooterDesktopButtons;
