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
import { updateBurgerMenu } from '../../store/burgerMenu/burgerMenu.slice';

export default function Header() {
    const dispatch = useDispatch();
    const isMenuOpen = useSelector((state: RootState) => state.menu.open);
    const color = useSelector((state: RootState) => state.color);
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
        const currentPath = location.pathname.substr(1);
        setActive(getActiveState(currentPath));
    }, [location]);

    return (
        <div style={{ backgroundColor: color.headerColors }} className={styles.wrap}>
            <div className={styles.title} style={{ color: color.textColor }}>
                <div 
                    onClick={() => dispatch(updateBurgerMenu(!isMenuOpen))} 
                    className={styles.burgerMenu}
                >
                    <BurgerMenuSVG color={color.textColor} />
                </div>
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
                            className={isActive ? styles['nav-btn'] : styles['not-active']}
                            to={path}
                            style={{
                                '--header-bg-color': color.headerColors,
                                '--text-color': color.textColor,
                                '--hover-bg-color': color.hoverColor,
                                '--header-svg-color': color.headerSvgColor,
                            } as React.CSSProperties}
                        >
                            <Icon />
                            <span style={{ color: color.headerSvgColor }}>{label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
}
