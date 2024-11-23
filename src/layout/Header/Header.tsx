import styles from './Header.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BurgerMenuSVG from '../../SVG/BurgerMenuSVG/BurgerMenuSVG';
import { updateBurgerMenu, updateVisible } from '../../store/burgerMenu/burgerMenu.slice';
import ArrowPrevSmallSvg from '../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg';
import { resetStateAll, setTestInactive } from '../../store/currentData/currentData.slice';
import Modal from '../../components/Modal/Modal';
import ReactDOM from "react-dom";

import { NAV_ITEMS } from "./services/pathKey";

const Header = () => {
  const dispatch = useDispatch();
  const { open: isMenuOpen, visible } = useSelector((state: RootState) => state.menu);
  const { headerColors, textColor, hoverColor, headerSvgColor } = useSelector(
    (state: RootState) => state.color.themeData
  );
  const currentTestInProgress = useSelector((state: RootState) => state.currentData.currentTestInProgress);

  const modalRoot = document.getElementById("modal-root");
  const location = useLocation();
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);
  const [pendingPath, setPendingPath] = useState("");
  const [title,setTitle] = useState('')

  useEffect(() => {
    const currentNavItem = NAV_ITEMS.find((item) => item.path === location.pathname);
    if (currentNavItem) {
      setTitle(currentNavItem.label)
    }
    console.log("currentNavItem:",currentNavItem)
  }, [location]);

  const renderVisibilityToggle = useCallback(() => (
    visible ? (
      <div
        onClick={() => dispatch(updateBurgerMenu(!isMenuOpen))}
        className={styles.burgerMenu}
      >
        <BurgerMenuSVG color={textColor} />
      </div>
    ) : (
      <div onClick={() => dispatch(updateVisible(true))} className={styles.arrow}>
        <ArrowPrevSmallSvg width="40px" height="40px" color={textColor} />
      </div>
    )
  ), [dispatch, isMenuOpen, textColor, visible]);

  const checkTest = useCallback(
    (path: string, event: React.MouseEvent<HTMLAnchorElement>) => {
      if (currentTestInProgress) {
        event.preventDefault();
        setPendingPath(path);
        setModalVisible(true);
      } else {
        navigate(path);
      }
    },
    [currentTestInProgress, navigate]
  );

  const handleCloseTest = () => {
    setModalVisible(false);
    dispatch(resetStateAll());
    dispatch(setTestInactive(false));
    navigate(pendingPath);
  };

  return (
    <div style={{ backgroundColor: headerColors }} className={styles.wrap}>
      <div className={styles.title} style={{ color: textColor }}>
        {renderVisibilityToggle()}
        <h3 className={styles.titleText}>Theory Test</h3>
        <h3 className={styles.pageName}>{title} </h3>
      </div>
      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={(e) => checkTest(path, e)}
            className={({ isActive }) =>
              isActive ? styles['nav-btn'] : styles['not-active']
            }
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
        ))}
      </nav>

      {modalVisible && modalRoot &&
        ReactDOM.createPortal(
          <Modal
            title="Are you sure you want to exit the test?"
            cancel
            cancelClick={() => setModalVisible(false)}
            close={handleCloseTest}
            blueBtnText="Exit Test"
            text=""
          />,
          modalRoot
        )}
    </div>
  );
};

export default Header;
