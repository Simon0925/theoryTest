import styles from './Header.module.scss';
import PencilSvg from '../../../SVG/PencilSvg/PencilSvg';
import ClockSvg from '../../../SVG/ClockSvg/ClockSvg';
import LightSvg from '../../../SVG/LightSvg/LightSvg';
import CameraSvg from '../../../SVG/CameraSvg/CameraSvg';
import SettingsSvg from '../../../SVG/SettingsSvg/SettingsSvg';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export default function Header() {
    const [active, setActive] = useState({
        practice: false,
        mockTest: false,
        trainer:false,
        hpt:false,
        settings:false
    });
    const location = useLocation();
    const color = useSelector((state: RootState) => state.color);


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
            <div style={{backgroundColor: color.headerColors}} className={styles.wrap}>
                <div 
                 className={styles.title}
                 style={{color: color.textColor}} 
                 >
                    <h3>Theory Test</h3>
                </div>
                <nav className={styles.nav}>
                <NavLink
                    className={active.practice ? styles['nav-btn'] : styles['not-active']}
                    style={{
                        '--header-bg-color': color.headerColors,
                        '--text-color': color.textColor,
                        '--hover-bg-color': color.hoverColor,
                        '--header-svg-color':color.textColor
                    } as React.CSSProperties}
                    to='/'
                    >
                        <PencilSvg />
                        <span style={{color:color.headerSvgColor}}>Practice</span>
                    </NavLink>
                    <NavLink 
                        className={active.mockTest ? styles['nav-btn'] : styles['not-active']} 
                        style={{
                            '--header-bg-color': color.headerColors,
                            '--text-color': color.textColor,
                            '--hover-bg-color': color.hoverColor,
                            '--header-svg-color':color.headerSvgColor
                        } as React.CSSProperties}
                    to='/mock-test'>
                        <ClockSvg />
                        <span style={{color:color.headerSvgColor}} >Mock Test</span>
                    </NavLink>
                    <NavLink 
                        className={active.trainer ? styles['nav-btn'] : styles['not-active']}
                        to='/trainer' 
                        style={{
                            '--header-bg-color': color.headerColors,
                            '--text-color': color.textColor,
                            '--hover-bg-color': color.hoverColor,
                            '--header-svg-color':color.headerSvgColor
                        } as React.CSSProperties}
                    >
                        <LightSvg />
                        <span style={{color:color.headerSvgColor}}>Trainer</span>
                    </NavLink>
                    <NavLink
                        className={active.hpt ? styles['nav-btn'] : styles['not-active']}
                        style={{
                            '--header-bg-color': color.headerColors,
                            '--text-color': color.textColor,
                            '--hover-bg-color': color.hoverColor,
                            '--header-svg-color':color.headerSvgColor
                        } as React.CSSProperties} 
                        to='/hpt' >
                        <CameraSvg />
                        <span style={{color:color.headerSvgColor}}>HPT</span>
                    </NavLink>
                    <NavLink 
                        className={active.settings ? styles['nav-btn'] : styles['not-active']}
                        to='/settings' 
                        style={{
                            '--header-bg-color': color.headerColors,
                            '--text-color': color.textColor,
                            '--hover-bg-color': color.hoverColor,
                            '--header-svg-color':color.headerSvgColor
                        } as React.CSSProperties}
                    >
                        <SettingsSvg />
                        <span style={{color:color.headerSvgColor}}>Settings</span>
                    </NavLink>
                </nav>
            </div>
        </>
    );
}
