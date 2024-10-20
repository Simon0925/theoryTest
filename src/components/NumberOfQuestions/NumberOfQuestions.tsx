import {useEffect, useState } from 'react';
import styles from './NumberOfQuestions.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateNumberOfQuestions } from '../../store/practice/practice.slice'; 


interface NumberOfQuestionsProps {
    change:(quantity:string)=>void;
}

export default function NumberOfQuestions ({change}:NumberOfQuestionsProps) {

    const dispatch = useDispatch();

    const practice = useSelector((state: RootState) => state.practice);

    const [quantity, setQuantity] = useState(0)

    useEffect(()=>{
        if(practice.allDataLength != undefined){
            setQuantity(practice.allDataLength)
        }else{
            setQuantity(0)
        }
    },[practice.allDataLength])

    
    const [active, setActive] = useState({
            ten: practice.numberOfQuestions === 'ten',
            twenty: practice.numberOfQuestions === 'twenty',
            thirty: practice.numberOfQuestions === 'thirty',
            all:practice.numberOfQuestions === 'All'
    });

   

    const select = (type: string) => {
        if (type === 'all') {
            const newCheckedState = 'all'
            dispatch(updateNumberOfQuestions(newCheckedState));
            setActive({
                ten: false,
                twenty: false,
                thirty: false,
                all:true
            });
            change(newCheckedState)
        } else if (type === 'ten') {
            const newCheckedState = 'ten'
            dispatch(updateNumberOfQuestions(newCheckedState));
            setActive({
                ten: true,
                twenty: false,
                thirty: false,
                all:false
            });
            change(newCheckedState)
        } else if (type === 'twenty') {
            const newCheckedState = 'twenty'
            dispatch(updateNumberOfQuestions(newCheckedState));
            setActive({
                ten: false,
                twenty: true,
                thirty: false,
                all:false
            });
            change(newCheckedState)
        } else if (type === 'thirty') {
            const newCheckedState = 'thirty'
            dispatch(updateNumberOfQuestions(newCheckedState));
            setActive({
                ten: false,
                twenty: false,
                thirty: true,
                all:false
            });
            change(newCheckedState)
        }
    };

    return (
        <div className={styles['question-type']}>
            <p className={styles['title']}>Number of questions</p>
            <div className={styles['container']}>
                <div onClick={() => select('ten')} className={active.ten ? styles['active'] : styles['not-active']}>
                    <p>10</p>
                </div>
                <div onClick={() => select('twenty')} className={active.twenty ? styles['active'] : styles['not-active']}>
                    <p>20</p>
                </div>
                <div onClick={() => select('thirty')} className={active.thirty ? styles['active'] : styles['not-active']}>
                    <p>30</p>
                </div>
                <div onClick={() => select('all')} className={active.all ? styles['active'] : styles['not-active']}>
                    <p>All {quantity}</p>
                </div>
            </div>
        </div>
    );
}