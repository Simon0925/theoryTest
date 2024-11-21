import {useEffect, useState } from 'react';
import styles from './NumberOfQuestions.module.scss'
import {  shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateNumberOfQuestions } from '../../store/practice/practice.slice'; 



export default function NumberOfQuestions () {
    const {questions} = useSelector(
        (state: RootState) => state.currentData.testsData["PracticeTest"],
        shallowEqual
    );
    const dispatch = useDispatch();

    const practice = useSelector((state: RootState) => state.practice);
    const color = useSelector((state: RootState) => state.color.themeData);
    
    const [allQuestionLength , setAllQuestionLength] = useState(practice.allQuestionLength)


    useEffect(()=>{
        if(practice.type === "noSeen" || practice.type === "wrong"){
            setAllQuestionLength(questions.length)
        }else{
            setAllQuestionLength(practice.allQuestionLength)
        }
    },[questions,practice])

    const [active, setActive] = useState({
            ten: practice.numberOfQuestions === 'ten',
            twenty: practice.numberOfQuestions === 'twenty',
            thirty: practice.numberOfQuestions === 'thirty',
            all:practice.numberOfQuestions === 'all'
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
        } else if (type === 'ten') {
            const newCheckedState = 'ten'
            dispatch(updateNumberOfQuestions(newCheckedState));
            setActive({
                ten: true,
                twenty: false,
                thirty: false,
                all:false
            });
        } else if (type === 'twenty') {
            const newCheckedState = 'twenty'
            dispatch(updateNumberOfQuestions(newCheckedState));
            setActive({
                ten: false,
                twenty: true,
                thirty: false,
                all:false
            });
        } else if (type === 'thirty') {
            const newCheckedState = 'thirty'
            dispatch(updateNumberOfQuestions(newCheckedState));
            setActive({
                ten: false,
                twenty: false,
                thirty: true,
                all:false
            });
        }
    };

    return (
        <div className={styles.wrap}>
            <p style={{color:color.titleColorSettings}} className={styles['title']}>Number of questions</p>
            <div style={{
                    '--text-active-color': color.textActiveSettingsColor,
                    '--text-not-active-color': color.textNotActiveSettingsColor,
                    '--background-not-active-color':color.btnSettingsColorNotActive,
                    '--background-active-color':color.btnSettingsColor,
                    '--background':color.btnSettingsBackgroundColor
                } as React.CSSProperties}
                className={styles['container']}
            >
                <div  onClick={() => select('ten')} className={active.ten ? styles['active'] : styles['not-active']}>
                    <p>10</p>
                </div>
                <div onClick={() => select('twenty')} className={active.twenty ? styles['active'] : styles['not-active']}>
                    <p>20</p>
                </div>
                <div onClick={() => select('thirty')} className={active.thirty ? styles['active'] : styles['not-active']}>
                    <p>30</p>
                </div>
                <div onClick={() => select('all')} className={active.all ? styles['active'] : styles['not-active']}>
                    <p>All {allQuestionLength}</p>
                </div>
            </div>
        </div>
    );
}