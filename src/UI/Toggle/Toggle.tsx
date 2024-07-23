import { useEffect, useState } from 'react';
import styles from './Toggle.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateCorrect } from '../../store/practice.slice'; 

export default function Toggle() {
    const dispatch = useDispatch();
    const practice = useSelector((state: RootState) => state.practice);

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
            <span className={styles.slider}></span>
        </label>
    );
}
