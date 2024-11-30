import styles from './Toggle.module.scss';
import { useEffect, useState } from 'react';

interface ToggleProps {
    toggle: (e: boolean) => void;
    initialSwitch?: boolean;
}

export default function Toggle({ toggle, initialSwitch = false }: ToggleProps) {
    
    const [isChecked, setIsChecked] = useState<boolean>(initialSwitch);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        toggle(newCheckedState);
    };

    useEffect(() => {
        setIsChecked(initialSwitch ?? false); 
    }, [initialSwitch]);

    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
                name={"Toggle"}
            />
            <span className={styles.slider}></span>
        </label>
    );
}
