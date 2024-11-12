import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import PracticeGroup from "../PracticeGroup/PracticeGroup";
import styles from "./PracticeQuestionsManagerMobile.module.scss";
import TestOptions from "../TestOptions/TestOptions";
import { updateVisible } from "../../store/burgerMenu/burgerMenu.slice";

interface PracticeQuestionsManagerMobileProps {
    practiceTest: (e: boolean) => void;
}

export default function PracticeQuestionsManagerMobile({ practiceTest }: PracticeQuestionsManagerMobileProps) {
    const dispatch: AppDispatch = useDispatch();
    const visible = useSelector((state: RootState) => state.menu.visible);
    const practice = useSelector((state: RootState) => state.practice);

    const next = () => {
        if (practice.question?.length > 0 || practice.flagged) {
            dispatch(updateVisible(false));
        }
    };

    return (
        <div className={styles.wrap}>
            {visible && (
                <>
                    <PracticeGroup />
                    <button onClick={next} className={styles.btn}>
                        Next
                    </button>
                </>
            )}
            {!visible && (
                <>
                    <TestOptions practiceTest={practiceTest} />
                </>
            )}
        </div>
    );
}
