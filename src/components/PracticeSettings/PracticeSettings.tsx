import { useEffect, useState } from 'react';
import Toggle from '../../UI/Toggle/Toggle';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';
import PracticeTools from '../PracticeTools/PracticeTools';
import styles from './PracticeSettings.module.scss';
import { NavLink } from 'react-router-dom';
import service from '../../service/service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updatecurrentQuestions } from '../../store/practice.slice'; 

export default function PracticeSettings() {

    const dispatch = useDispatch();

    const storeQuestion = useSelector((state: RootState) => state.practice.question);

    const [quantityOfQuestions,setQuantityOfQuestions] = useState("all")

    const [QuestionType,setQuestionType] = useState('all')

    const [quantity,setQuantity] = useState(0)

    useEffect(()=>{
        console.log("quantity:",quantity)
    },[quantity])

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const data = await service.questionFilter({
                    type:QuestionType,
                    questions:storeQuestion,
                    userId:"66b3c723a19d64ee1672d116",
                    quantity:quantityOfQuestions
                });
                dispatch(updatecurrentQuestions(data.data));
                setQuantity(data.data.length)
            } catch (error) {
              console.error('Error posting questions in useEffect:', error);
            }
          };
          fetchData();
    },[storeQuestion,QuestionType,quantityOfQuestions])
    
    return (
        <div className={styles['wrap']}>
            <div className={styles['toggle-container']}>
                <span>Show correct answer instantly</span>
                <Toggle  />
            </div>
            <PracticeTools change={setQuestionType} />
            <NumberOfQuestions change={setQuantityOfQuestions} type={QuestionType} quantityCurrent={quantity} />
            <div className={styles['btn']}>
            <NavLink  to='/test' >
                    <button>Start</button> 
            </NavLink>
            </div>
        </div>
    );
}
