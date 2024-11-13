import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import PracticeGroup from "../PracticeGroup/PracticeGroup";
import styles from "./PracticeQuestionsManagerMobile.module.scss";
import TestOptions from "../TestOptions/TestOptions";
import { updateVisible } from "../../store/burgerMenu/burgerMenu.slice";
import { useCallback } from "react";

interface PracticeQuestionsManagerMobileProps {
    practiceTest: (e: boolean) => void;
}

export default function PracticeQuestionsManagerMobile({ practiceTest }: PracticeQuestionsManagerMobileProps) {
    const dispatch: AppDispatch = useDispatch();
    const visible = useSelector((state: RootState) => state.menu.visible);
    const {
        color,
        practice,
        questions,
        isLoading,
      } = useSelector((state: RootState) => ({
        color: state.color,
        practice: state.practice,
        questions: state.currentData.testsData["PracticeTest"]?.questions || [],
        isLoading: state.currentData.testsData["PracticeTest"]?.isLoading || false,
      }), shallowEqual);

    const next = () => {
        if (practice.question?.length > 0 || practice.flagged) {
            dispatch(updateVisible(false));
        }
    };

    const start = useCallback(() => {
        if (questions.length > 0) {
          practiceTest(true);
          dispatch(updateVisible(true));
        }
      }, [questions.length, dispatch, practiceTest]);

    return (
        <div className={styles.wrap}>
            {visible && (
                <>
                    <PracticeGroup /> 
                   
                </>
            )}
            {!visible && (
                <>
                    <TestOptions />
                </>
            )}
           <button onClick={visible ?next : start}  className={!isLoading &&!visible && questions.length > 0 ?  styles.btnIsLoading:styles.btn }>
                {isLoading &&!visible ? 'Loading...' : !visible ?'Start':"Next"}
            </button>
        </div>
    );
}
