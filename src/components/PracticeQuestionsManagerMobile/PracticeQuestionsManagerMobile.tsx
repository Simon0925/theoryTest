import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import PracticeTopics from "../PracticeTopics/PracticeTopics";
import TestOptions from "../TestOptions/TestOptions";
import Modal from "../Modal/Modal";
import { updateVisible } from "../../store/burgerMenu/burgerMenu.slice";
import { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import useCookie from "../../hooks/useCookie";
import { allData } from "../../services/allData/allData";

import styles from "./PracticeQuestionsManagerMobile.module.scss";

interface PracticeQuestionsManagerMobileProps {
    practiceTest: (e: boolean) => void;
}

export default function PracticeQuestionsManagerMobile({ practiceTest }: PracticeQuestionsManagerMobileProps) {
    const modalRoot = document.getElementById("modal-root");

    const [modalVisible, setModalVisible] = useState(false);

    const accessToken = useCookie('accessToken');
    const dispatch: AppDispatch = useDispatch();

    const visible = useSelector((state: RootState) => state.menu.visible);
    const { topic, flagged } = useSelector((state: RootState) => state.practice);

    const handleNext = useCallback(() => {
        if (topic.length > 0 || flagged) {
            dispatch(updateVisible(false)); 
        } else {
            setModalVisible(true); 
        }
    }, [topic, flagged, dispatch]);

    const handleStartWithoutTopic = async () => {
        setModalVisible(false);
        practiceTest(true);
        if (accessToken) {
            try {
                await allData(dispatch, accessToken, "PracticeTest");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    const start = useCallback(() =>{
        practiceTest(true)
        dispatch(updateVisible(true)); 
    },[dispatch,practiceTest])

    return (
        <div className={styles.wrap}>
            {visible ? <PracticeTopics /> : <TestOptions />}

            <button
                onClick={visible ? handleNext : start}
                className={styles.btn}
            >
                Start
            </button>

            {modalVisible && modalRoot &&
                ReactDOM.createPortal(
                    <Modal
                        title="A test cannot be generated with your current settings"
                        cancel
                        cancelClick={() => setModalVisible(false)}
                        close={handleStartWithoutTopic}
                        blueBtnText="Quick Test"
                        text="Please select at least one topic. Alternatively, you can do a quick test by letting us pick the right questions for you!"
                    />,
                    modalRoot
                )}
        </div>
    );
}
