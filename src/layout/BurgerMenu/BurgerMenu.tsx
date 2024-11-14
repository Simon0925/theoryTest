import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./BurgerMenu.module.scss";
import { useEffect, useState } from "react";
import PencilSvg from "../../SVG/PencilSvg/PencilSvg";
import ClockSvg from "../../SVG/ClockSvg/ClockSvg";
import LightSvg from "../../SVG/LightSvg/LightSvg";
import CameraSvg from "../../SVG/CameraSvg/CameraSvg";
import SettingsSvg from "../../SVG/SettingsSvg/SettingsSvg";
import ChangeColor from "../../components/ChangeColor/ChangeColor";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";


export default function BurgerMenu() {
    
    const location = useLocation();
    const navigate = useNavigate();

    const currentTestInProgress = useSelector((state: RootState) => state.currentData.currentTestInProgress);

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

    const checkTest =  (path:string,event: React.MouseEvent<HTMLAnchorElement>) => {
        if(currentTestInProgress){
            event.preventDefault();
        }else{
            navigate(path);
        }
    }
    
    const navItems = [
        { path: '/', icon: PencilSvg, label: 'Practice' },
        { path: '/mock-test', icon: ClockSvg, label: 'Mock Test' },
        { path: '/trainer', icon: LightSvg, label: 'Trainer' },
        { path: '/hpt', icon: CameraSvg, label: 'HPT' },
        { path: '/settings', icon: SettingsSvg, label: 'Settings' },
      ];

    return (
        <div className={styles.wrap}>
            <div className={styles.title}>
                <h3>Theory Test</h3>
            </div>
            <nav className={styles.nav}>
            {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = active[path === '/' ? 'practice' : path.slice(1).replace('-', '') as keyof typeof active];
                return (
                    <NavLink
                    key={path}
                    onClick={(e) => checkTest(path, e)}
                    className={isActive ? styles['nav-btn'] : styles['not-active']}
                    to={path}
                    
                    >
                    <Icon />
                    <span >{label}</span>
                    </NavLink>
                );
            })}
            </nav>
            <div className={styles.containerColor}>
                <ChangeColor />
            </div>
        </div>
    );
}
