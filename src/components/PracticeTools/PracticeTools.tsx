import { useState } from 'react';
import styles from './PracticeTools.module.scss';
import { RootState } from '../../store/store';
import { updateType } from '../../store/practice/practice.slice'; 
import { useDispatch, useSelector } from 'react-redux';


interface NumberOfQuestionsProps {
    change:(quantity:string)=>void;
}

export default function PracticeTools({change}:NumberOfQuestionsProps) {
    const dispatch = useDispatch();
    const practice = useSelector((state: RootState) => state.practice);
    
    const [active, setActive] = useState({
        all:practice.type === "All",
        noSeen: practice.type === "noSeen",
        wrong: practice.type === "wrong",
    });

    const select = (type: string) => {
        if (type === 'all') {
            const newCheckedState = 'all'
            dispatch(updateType(newCheckedState));
            setActive({
                all: true,
                noSeen: false,
                wrong: false,
            });
            change(newCheckedState)
        } else if (type === 'noSeen') {
            const newCheckedState = 'noSeen'
            dispatch(updateType(newCheckedState));
            setActive({
                all: false,
                noSeen: true,
                wrong: false,
            });
            change(newCheckedState)
        } else if (type === 'wrong') {
            const newCheckedState = 'wrong'
            dispatch(updateType(newCheckedState));
            setActive({
                all: false,
                noSeen: false,
                wrong: true,
            });
            change(newCheckedState)
        }
    };

    return (
        <div className={styles['question-type']}>
            <p className={styles['title']}>Question type</p>
            <div className={styles['container']}>
                <div onClick={() => select('all')} className={active.all ? styles['active'] : styles['not-active']}>
                    <p>All</p>
                </div>
                <div onClick={() => select('noSeen')} className={active.noSeen ? styles['active'] : styles['not-active']}>
                    <p>No seen</p>
                </div>
                <div onClick={() => select('wrong')} className={active.wrong ? styles['active'] : styles['not-active']}>
                    <p>Wrong</p>
                </div>
            </div>
        </div>
    );
}
