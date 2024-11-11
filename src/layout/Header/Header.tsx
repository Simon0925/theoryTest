import styles from './Header.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
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
import isTest from './service/isTest';

interface HeaderProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNextPath: (e: string) => void;
}

const Header = ({ setModal, setNextPath }: HeaderProps) => {
  const dispatch = useDispatch();
  const { open: isMenuOpen, visible } = useSelector((state: RootState) => state.menu);
  const { headerColors, textColor, hoverColor, headerSvgColor } = useSelector(
    (state: RootState) => state.color
  );
  const location = useLocation();
  const navigate = useNavigate();
  const testsData = useSelector((state: RootState) => state.currentData.testsData);

  const [currentLabel, setCurrentLabel] = useState<string>('Practice');

  const getActiveState = useCallback(
    (path: string) => ({
      practice: path === '' || path === '/',
      mocktest: path === 'mock-test',
      trainer: path === 'trainer',
      hpt: path === 'hpt',
      settings: path === 'settings',
    }),
    []
  );

  const [active, setActive] = useState(getActiveState(location.pathname.substr(1)));

  useEffect(() => {
    setActive(getActiveState(location.pathname.substr(1)));

    const currentNavItem = navItems.find((item) => item.path === location.pathname);
    if (currentNavItem) {
      setCurrentLabel(currentNavItem.label);
    }
  }, [location, getActiveState]);

  const renderVisibilityToggle = useCallback(() => {
    return visible ? (
      <div
        onClick={() => dispatch(updateBurgerMenu(!isMenuOpen))}
        className={styles.burgerMenu}
      >
        <BurgerMenuSVG color={textColor} />
      </div>
    ) : (
      <div onClick={() => dispatch(updateVisible(true))} className={styles.arrow}>
        <ArrowPrevSmallSvg width={'40px'} height={'40px'} color={textColor} />
      </div>
    );
  }, [dispatch, isMenuOpen, textColor, visible]);

  const checkTest = useCallback(
    (path: string, event: React.MouseEvent<HTMLAnchorElement>) => {
      const activeTest = isTest(path, testsData);
  
      if (activeTest) {
        event.preventDefault();
        setNextPath(path);
        setModal(true);
      } else {
        navigate(path);
      }
    },
    [testsData, navigate, setModal, setNextPath]
  );

  const navItems = [
    { path: '/', icon: PencilSvg, label: 'Practice' },
    { path: '/mock-test', icon: ClockSvg, label: 'Mock Test' },
    { path: '/trainer', icon: LightSvg, label: 'Trainer' },
    { path: '/hpt', icon: CameraSvg, label: 'HPT' },
    { path: '/settings', icon: SettingsSvg, label: 'Settings' },
  ];

  return (
    <div style={{ backgroundColor: headerColors }} className={styles.wrap}>
      <div className={styles.title} style={{ color: textColor }}>
        {renderVisibilityToggle()}
        <h3 className={styles.titleText}>Theory Test</h3>
        <h3 className={styles.pageName}>{currentLabel}</h3> {/* Display current label */}
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
              <span style={{ color: headerSvgColor }}>{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Header;