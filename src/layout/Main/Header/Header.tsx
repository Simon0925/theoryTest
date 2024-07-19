import styles from './Header.module.scss';
import PencilSvg from '../../../SVG/PencilSvg/PencilSvg';
import ClockSvg from '../../../SVG/ClockSvg/ClockSvg';
import LightSvg from '../../../SVG/LightSvg/LightSvg';
import CameraSvg from '../../../SVG/CameraSvg/CameraSvg';
import SettingsSvg from '../../../SVG/SettingsSvg/SettingsSvg';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
    const [active, setActive] = useState({
        practice: false,
        mockTest: false,
        trainer:false,
        hpt:false,
        settings:false
    });
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.substr(1);
    
        setActive({
            practice: path === '' || path === '/',
            mockTest: path === 'mock-test',
            trainer: path === 'trainer',
            hpt: path === 'hpt',
            settings:path === 'settings',
        });
        
    }, [location.pathname]); 



    
    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.title}>
                    <h3>Theory Test</h3>
                </div>
                <nav className={styles.nav}>
                    <NavLink className={active.practice ? styles['nav-btn'] : styles['not-active']} to='/' >
                        <PencilSvg />
                        <span>Practice</span>
                    </NavLink>
                    <NavLink className={active.mockTest ? styles['nav-btn'] : styles['not-active']}  to='/mock-test'>
                        <ClockSvg />
                        <span>Mock Test</span>
                    </NavLink>
                    <NavLink className={active.trainer ? styles['nav-btn'] : styles['not-active']} to='/trainer' >
                        <LightSvg />
                        <span>Trainer</span>
                    </NavLink>
                    <NavLink className={active.hpt ? styles['nav-btn'] : styles['not-active']} to='/hpt' >
                        <CameraSvg />
                        <span>HPT</span>
                    </NavLink>
                    <NavLink className={active.settings ? styles['nav-btn'] : styles['not-active']} to='/settings' >
                        <SettingsSvg />
                        <span>Settings</span>
                    </NavLink>
                </nav>
            </div>
        </>
    );
}
