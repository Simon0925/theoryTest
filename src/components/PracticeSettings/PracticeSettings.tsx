import Toggle from '../../UI/Toggle/Toggle';
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';
import PracticeTools from '../PracticeTools/PracticeTools';
import styles from './PracticeSettings.module.scss';
import { NavLink } from 'react-router-dom';



export default function PracticeSettings() {

    
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
