import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import PracticeGroup from "../PracticeGroup/PracticeGroup";
import styles from "./PracticeQuestionsManagerMobile.module.scss";
import TestOptions from "../TestOptions/TestOptions";
import { updateVisible } from "../../store/burgerMenu/burgerMenu.slice";
import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";
import useCookie from "../../hooks/useCookie";
import { allData } from "../../services/allData/allData";


interface PracticeQuestionsManagerMobileProps {
    practiceTest: (e: boolean) => void;
}

export default function PracticeQuestionsManagerMobile({ practiceTest }: PracticeQuestionsManagerMobileProps) {
    const modalRoot = document.getElementById("modal-root");
    const [modalVisible, setModalVisible] = useState(false);
    const accessToken = useCookie('accessToken');

    const dispatch: AppDispatch = useDispatch();
    const visible = useSelector((state: RootState) => state.menu.visible);
    const {
        practice,
        questions,
      } = useSelector((state: RootState) => ({
        color: state.color.themeData,
        practice: state.practice,
        questions: state.currentData.testsData["PracticeTest"]?.questions || [],
      }), shallowEqual);

    const next = useCallback(() => {
        if (practice.question?.length > 0 || practice.flagged) {
            dispatch(updateVisible(false));
        }else if(practice.question.length === 0){
            setModalVisible(true)
        }
    }, [practice.question, dispatch,setModalVisible]);

    const stertWithOutTopic = async () =>{
        // setModalVisible(false)
        // practiceTest(true)
        if(accessToken){
        try{
            await allData(dispatch,accessToken,"PracticeTest")
        }catch(error){
            console.log(error)
        }
      }
    }

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
           
                <button onClick={visible ?next : start}  className={styles.btn }>
                    Start
                </button>
            {modalVisible && modalRoot &&
                ReactDOM.createPortal(
                    <Modal
                        title="A test cannot be generated with your current settings"
                        cancel
                        cancelClick={() => setModalVisible(false)}
                        close={stertWithOutTopic}
                        blueBtnText="Quick Test"
                        text="Please select at least one topic. 
                        Alternatively, you can do a quick test by letting us pick the right questions for you!"
                    />,
                modalRoot
            )}
        </div>
    );
}
