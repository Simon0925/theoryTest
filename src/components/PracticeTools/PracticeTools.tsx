import { useState } from 'react';
import styles from './PracticeTools.module.scss';
import { RootState } from '../../store/store';
import { updateType } from '../../store/practice/practice.slice'; 
import { useDispatch, useSelector } from 'react-redux';


export default function PracticeTools() {
    const dispatch = useDispatch();
    const practice = useSelector((state: RootState) => state.practice);
    const color = useSelector((state: RootState) => state.color);
    
    const [active, setActive] = useState({
        all:practice.type === "all",
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
        } else if (type === 'noSeen') {
            const newCheckedState = 'noSeen'
            dispatch(updateType(newCheckedState));
            setActive({
                all: false,
                noSeen: true,
                wrong: false,
            });
        } else if (type === 'wrong') {
            const newCheckedState = 'wrong'
            dispatch(updateType(newCheckedState));
            setActive({
                all: false,
                noSeen: false,
                wrong: true,
            });
        }
    };

    return (
        <div className={styles.wrap}>
            <p style={{color:color.titleColorSettings}} className={styles.title}>Question type</p>
            <div
            style={{
                '--text-active-color': color.textActiveSettingsColor,
                '--text-not-active-color': color.textNotActiveSettingsColor,
                '--background-not-active-color':color.btnSettingsColorNotActive,
                '--background-active-color':color.btnSettingsColor,
                '--background':color.btnSettingsBackgroundColor
            } as React.CSSProperties}
             className={styles['container']}>
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