import { useCallback, useEffect, useState} from 'react';
import Toggle from '../../UI/Toggle/Toggle';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';
import PracticeTools from '../PracticeTools/PracticeTools';
import styles from './PracticeSettings.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchQuestions, updateCorrect } from '../../store/practice/practice.slice';
import ReactDOM from "react-dom";
import {allData} from '../../services/allData/allData'
import { AppDispatch } from '../../store/store'; 
import useCookie from '../../hooks/useCookie';
import Modal from '../Modal/Modal';

interface PracticeSettingsProps {
    practiceTest: (e: boolean) => void;
}

export default function PracticeSettings({ practiceTest }: PracticeSettingsProps) {
    
    const modalRoot = document.getElementById("modal-root");
    
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    const accessToken = useCookie('accessToken');

    const color = useSelector((state: RootState) => state.color.themeData);

    const practice = useSelector((state: RootState) => state.practice);

    const [isChecked, setIsChecked] = useState(practice.correct);

    useEffect(()=>{
        dispatch(updateCorrect(isChecked));
    },[isChecked])

    const stertWithOutTopic = async () =>{
        setModalVisible(false)
        practiceTest(true)
        if(accessToken){
        try{
            await allData(dispatch,accessToken,"PracticeTest")
        }catch(error){
            console.log(error)
        }
      }
    }

    const start = useCallback(() => {
        if (practice.topic.length <= 0 && !practice.flagged) {
            setModalVisible(true);
        } else {
            practiceTest(true);
        }
    }, [practice.topic, practice.flagged, practiceTest]);

    useEffect(() => {
        if(accessToken){
            dispatch(fetchQuestions({ testId: 'PracticeTest',token:accessToken }));
        }
    }, [practice.topic,practice.allQuestionLength,practice.flagged,practice.numberOfQuestions,practice.type,accessToken]);



    return (
        <div  className={styles['wrap']}>
            <div style={{color:color.titleColorSettings}} className={styles['toggle-container']}>
                <span>Show correct answer instantly</span>
                <Toggle toggle={setIsChecked}/>
            </div>
            <PracticeTools  />
            <NumberOfQuestions  />
            <div className={styles['btn']} >
                <button className={styles.startBtn} onClick={start}>
                    Start
                 </button>
            </div>
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
