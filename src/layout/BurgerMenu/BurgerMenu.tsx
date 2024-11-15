import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./BurgerMenu.module.scss";
import { useEffect, useState } from "react";
import PencilSvg from "../../SVG/PencilSvg/PencilSvg";
import ClockSvg from "../../SVG/ClockSvg/ClockSvg";
import LightSvg from "../../SVG/LightSvg/LightSvg";
import CameraSvg from "../../SVG/CameraSvg/CameraSvg";
import SettingsSvg from "../../SVG/SettingsSvg/SettingsSvg";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import SwitchColor from "../../components/SwitchColor/SwitchColor";
import Modal from "../../components/Modal/Modal";
import { resetStateAll, setTestInactive } from "../../store/currentData/currentData.slice";
import ReactDOM from 'react-dom';

export default function BurgerMenu() {
    
    const dispatch = useDispatch();
    
    const location = useLocation();
    const navigate = useNavigate();
    const modalRoot = document.getElementById('modal-root');

    const { headerColors, textColor, hoverColor, headerSvgColor } = useSelector(
        (state: RootState) => state.color
      );
    
    const [modalVisible, setModalVisible] = useState(false);

    const [pendingPath, setPendingPath] = useState("");

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

    
    
    const navItems = [
        { path: '/', icon: PencilSvg, label: 'Practice' },
        { path: '/mock-test', icon: ClockSvg, label: 'Mock Test' },
        { path: '/trainer', icon: LightSvg, label: 'Trainer' },
        { path: '/hpt', icon: CameraSvg, label: 'HPT' },
        { path: '/settings', icon: SettingsSvg, label: 'Settings' },
      ];

      const handleCloseTest = () => {
        setModalVisible(false);
        dispatch(resetStateAll());
        dispatch(setTestInactive(false));
        navigate(pendingPath);
      }

      const checkTest =  (path:string,event: React.MouseEvent<HTMLAnchorElement>) => {
        if(currentTestInProgress){
            event.preventDefault();
            setPendingPath(path)
            setModalVisible(true);
        }else{
            navigate(path);
        }
      }

    return (
        <div style={{ backgroundColor: headerColors,borderRight:`1px solid${hoverColor}` }} className={styles.wrap}>
            <div style={{color:textColor}} className={styles.title}>
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
                    style={{
                        '--header-bg-color': headerColors,
                        '--text-color': textColor,
                        '--hover-bg-color': hoverColor,
                        '--header-svg-color': headerSvgColor,
                      } as React.CSSProperties}
                    >
                    <Icon />
                    <span >{label}</span>
                    </NavLink>
                );
            })}
            </nav>
            <div className={styles.containerColor}>
                <SwitchColor svgColor={headerSvgColor}  />
            </div>
            {modalVisible &&modalRoot &&
            ReactDOM.createPortal( 
                <Modal
                title="Are you sure you want to exit from the test?"
                cancel
                cancelClick={() => setModalVisible(false)}
                close={handleCloseTest}
                blueBtnText="Exit Test"
                text={''}
                />,modalRoot)
            }
        </div>
    );
}
