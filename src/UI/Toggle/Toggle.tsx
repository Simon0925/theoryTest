import styles from './Toggle.module.scss';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';

interface ToggleProps{
    toggle:(e:boolean) => void | undefined;
}

export default function Toggle({toggle}:ToggleProps) {
    
    const color = useSelector((state: RootState) => state.color);

    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked)
        toggle(!isChecked)
    };
 
    return (
        <label className={styles.switch}>
            <input
                type="checkbox" 
                checked={isChecked} 
                onChange={handleToggle} 
            />
            <span className={styles.slider}> </span>
        </label>
    );
}
