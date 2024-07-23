import Toggle from '../../UI/Toggle/Toggle';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';
import PracticeTools from '../PracticeTools/PracticeTools';
import styles from './PracticeSettings.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface PracticeSettingsProps {
    quantity: number | null;
}

export default function PracticeSettings({ quantity }: PracticeSettingsProps) {



    const practice = useSelector((state: RootState) => state.practice);



    
    return (
        <div className={styles['wrap']}>
            <div className={styles['toggle-container']}>
                <span>Show correct answer instantly</span>
                <Toggle  />
            </div>
            <PracticeTools />
            <NumberOfQuestions />
            <div className={styles['btn']}>
            <NavLink  to='/test' >
                    <button>Start</button> 
            </NavLink>
            </div>
        </div>
    );
}
