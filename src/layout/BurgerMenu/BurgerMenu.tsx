import { NavLink, useLocation } from "react-router-dom";
import styles from "./BurgerMenu.module.scss";
import { useEffect, useState } from "react";
import PencilSvg from "../../SVG/PencilSvg/PencilSvg";
import ClockSvg from "../../SVG/ClockSvg/ClockSvg";
import LightSvg from "../../SVG/LightSvg/LightSvg";
import CameraSvg from "../../SVG/CameraSvg/CameraSvg";
import SettingsSvg from "../../SVG/SettingsSvg/SettingsSvg";
import ChangeColor from "../../components/ChangeColor/ChangeColor";


export default function BurgerMenu() {
    
    const location = useLocation();
    

    const getActiveState = (path:string) => ({
        practice: path === '' || path === '/',
        mockTest: path === 'mock-test',
        trainer: path === 'trainer',
        hpt: path === 'hpt',
        settings: path === 'settings',
    });

    const [active, setActive] = useState(getActiveState(location.pathname.substr(1)));

    useEffect(() => {
        setActive(getActiveState(location.pathname.substr(1)));
    }, [location]);

    return (
        <div className={styles.wrap}>
            <div className={styles.title}>
                <h3>Theory Test</h3>
            </div>
            <nav className={styles.nav}>
                <NavLink
                    className={active.practice ? styles['nav-btn'] : styles['not-active']}
                    to='/'
                >
                    <PencilSvg />
                    <span>Practice</span>
                </NavLink>
                <NavLink
                    className={active.mockTest ? styles['nav-btn'] : styles['not-active']}
                    to='/mock-test'
                >
                    <ClockSvg />
                    <span>Mock Test</span>
                </NavLink>
                <NavLink
                    className={active.trainer ? styles['nav-btn'] : styles['not-active']}
                    to='/trainer'
                >
                    <LightSvg />
                    <span>Trainer</span>
                </NavLink>
                <NavLink
                    className={active.hpt ? styles['nav-btn'] : styles['not-active']}
                    to='/hpt'
                >
                    <CameraSvg />
                    <span>HPT</span>
                </NavLink>
                <NavLink
                    className={active.settings ? styles['nav-btn'] : styles['not-active']}
                    to='/settings'
                >
                    <SettingsSvg />
                    <span>Settings</span>
                </NavLink>
            </nav>
            <div className={styles.containerColor}>
                <ChangeColor />
            </div>
        </div>
    );
}
