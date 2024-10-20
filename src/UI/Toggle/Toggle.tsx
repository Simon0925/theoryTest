import { useState } from 'react';
import styles from './Toggle.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateCorrect } from '../../store/practice/practice.slice'; 

export default function Toggle() {
    const dispatch = useDispatch();
    const practice = useSelector((state: RootState) => state.practice);
    const color = useSelector((state: RootState) => state.color);
    const [isChecked, setIsChecked] = useState(practice.correct);


    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        dispatch(updateCorrect(newCheckedState));     
    };

 

    return (
        <label className={styles.switch}>
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleToggle} 
            />
            <span style={{
                background:color.toggleBackground,
                outline: `1px solid ${color.toggleBorder}`
            }} className={styles.slider}></span>
        </label>
    );
}
