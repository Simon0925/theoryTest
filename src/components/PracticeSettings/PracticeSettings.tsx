import { useEffect, useState } from 'react';
import Toggle from '../../UI/Toggle/Toggle';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';
import PracticeTools from '../PracticeTools/PracticeTools';
import styles from './PracticeSettings.module.scss';
import { NavLink } from 'react-router-dom';
import service from '../../service/service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updatecurrentQuestions,updateAllDataLength } from '../../store/practice.slice'; 

import idUser from "../../config/idUser"

export default function PracticeSettings() {

    const dispatch = useDispatch();

    const storeQuestion = useSelector((state: RootState) => state.practice.question);

    const flagged = useSelector((state: RootState) => state.practice.flagged);

    const [quantityOfQuestions,setQuantityOfQuestions] = useState("all")

    const [QuestionType,setQuestionType] = useState('all')

  
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const data = await service.questionFilter({
                    type:QuestionType,
                    questions:storeQuestion,
                    userId:idUser,
                    quantity:quantityOfQuestions,
                    flagged:flagged
                });
                dispatch(updatecurrentQuestions(data.data));
                dispatch(updateAllDataLength(data.allDataLength));
            } catch (error) {
              console.error('Error posting questions in useEffect:', error);
            }
          };
          fetchData();
    },[storeQuestion,QuestionType,quantityOfQuestions,flagged])
    
    return (
        <div className={styles['wrap']}>
            <div className={styles['toggle-container']}>
                <span>Show correct answer instantly</span>
                <Toggle  />
            </div>
            <PracticeTools change={setQuestionType} />
            <NumberOfQuestions change={setQuantityOfQuestions}  />
            <div className={styles['btn']}>
            <NavLink  to='/test' >
                    <button>Start</button> 
            </NavLink>
            </div>
        </div>
    );
}
