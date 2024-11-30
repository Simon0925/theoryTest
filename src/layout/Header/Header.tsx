import styles from './Header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateBurgerMenu, updateVisible } from '../../store/burgerMenu/burgerMenu.slice';
import Modal from '../../components/Modal/Modal';
import ReactDOM from "react-dom";
import { NAV_ITEMS } from "./services/pathKey";
import { useCheckTest } from '../../hooks/useHeaderHooks/useCheckTest';
import VisibilityToggle from '../../components/VisibilityToggle/VisibilityToggle';
import { useCloseTest } from '../../hooks/useNavHooks/useCloseTest';

const Header = () => {
  const dispatch = useDispatch();
  const { headerColors, textColor, hoverColor, headerSvgColor } = useSelector(
    (state: RootState) => state.color.themeData
  );
  const currentTestInProgress = useSelector((state: RootState) => state.currentData.currentTestInProgress);

  const modalRoot = document.getElementById("modal-root");
  const location = useLocation();

  const [title,setTitle] = useState('')

  useEffect(() => {
    const currentNavItem = NAV_ITEMS.find((item) => item.path === location.pathname);
    if (currentNavItem) {
      setTitle(currentNavItem.label)
    }
  }, [location]);
 
  const { modalVisible, setModalVisible, pendingPath, checkTest } = useCheckTest(currentTestInProgress);
  const handleCloseTest = useCloseTest(setModalVisible, pendingPath);

  return (
    <div style={{ backgroundColor: headerColors }} className={styles.wrap}>
      <div className={styles.title} style={{ color: textColor }}>
        <div className={styles.burgerMenu}>
          <VisibilityToggle
            textColor={textColor}
            updateBurgerMenu={(state) => dispatch(updateBurgerMenu(state))}
            updateVisible={(state) => dispatch(updateVisible(state))}
          />
        </div>
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
