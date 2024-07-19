import React, { useEffect, useState } from 'react';
import styles from './Toggle.module.scss';

export default function Toggle() {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        
    };


    return (
        <>
            <label className={styles.switch}>
                <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={handleToggle} 
                />
                <span className={styles.slider}></span>
            </label>
        </>
    );
}
