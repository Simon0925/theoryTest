import styles from './Header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import PencilSvg from '../../SVG/PencilSvg/PencilSvg';
import ClockSvg from '../../SVG/ClockSvg/ClockSvg';
import LightSvg from '../../SVG/LightSvg/LightSvg';
import CameraSvg from '../../SVG/CameraSvg/CameraSvg';
import SettingsSvg from '../../SVG/SettingsSvg/SettingsSvg';
import BurgerMenuSVG from '../../SVG/BurgerMenuSVG/BurgerMenuSVG';
import { updateBurgerMenu, updateVisible } from '../../store/burgerMenu/burgerMenu.slice';
import ArrowPrevSmallSvg from '../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg';
import isTest from './service/isTest'

export default function Header() {
    const dispatch = useDispatch();
    const { open: isMenuOpen, visible } = useSelector((state: RootState) => state.menu);
    const { headerColors, textColor, hoverColor, headerSvgColor } = useSelector((state: RootState) => state.color);
    const location = useLocation();

    const getActiveState = (path: string) => ({
        practice: path === '' || path === '/',
        mocktest: path === 'mock-test',
        trainer: path === 'trainer',
        hpt: path === 'hpt',
        settings: path === 'settings',
    });

    const [active, setActive] = useState(getActiveState(location.pathname.substr(1)));

    useEffect(() => {
        setActive(getActiveState(location.pathname.substr(1)));
    }, [location]);

   
    const renderVisibilityToggle = () => (
        visible ? (
            <div onClick={() => dispatch(updateBurgerMenu(!isMenuOpen))} className={styles.burgerMenu}>
                <BurgerMenuSVG color={textColor} />
            </div>
        ) : (
            <div onClick={() => dispatch(updateVisible(true))} className={styles.arrow}>
                <ArrowPrevSmallSvg width={'40px'} height={'40px'} color={textColor} />
            </div>
        )
    );
    
    const checkTest = (path:string) =>{
       let test = isTest(path)
       console.log("test",test)
    }

    return (
        <div style={{ backgroundColor: headerColors }} className={styles.wrap}>
            <div className={styles.title} style={{ color: textColor }}>
                {renderVisibilityToggle()}
                <h3 className={styles.titleText}>Theory Test</h3>
            </div>
            <nav className={styles.nav}>
                {['/', '/mock-test', '/trainer', '/hpt', '/settings'].map((path, index) => {
                    const key = path === '/' ? 'practice' : path.slice(1).replace('-', '') as keyof typeof active;
                    const isActive = active[key];
                    const icons = [PencilSvg, ClockSvg, LightSvg, CameraSvg, SettingsSvg];
                    const labels = ['Practice', 'Mock Test', 'Trainer', 'HPT', 'Settings'];
                    const Icon = icons[index];
                    const label = labels[index];

                    return (
                        <NavLink
                            key={path}
                            onClick={()=>checkTest(path)}
                            className={isActive ? styles['nav-btn'] : styles['not-active']}
                            to={path}
                            style={{
                                '--header-bg-color': headerColors,
                                '--text-color': textColor,
                                '--hover-bg-color': hoverColor,
                                '--header-svg-color': headerSvgColor,
                            } as React.CSSProperties}
                        >
                            <Icon />
                            <span style={{ color: headerSvgColor }}>{label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
}
