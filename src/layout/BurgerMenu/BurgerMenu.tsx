import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";

import styles from "./BurgerMenu.module.scss";
import SwitchColor from "../../components/SwitchColor/SwitchColor";
import Modal from "../../components/Modal/Modal";
import { RootState } from "../../store/store";

import { NAV_ITEMS, isActivePath } from "./services/pathKey";
import { useCheckTest } from "../../hooks/useHeaderHooks/useCheckTest";
import { useCloseTest } from "../../hooks/useNavHooks/useCloseTest";

export default function BurgerMenu() {
  const location = useLocation(); 

  const modalRoot = document.getElementById("modal-root");

  const { headerColors, textColor, hoverColor, headerSvgColor } = useSelector(
    (state: RootState) => state.color.themeData
  );

  const currentTestInProgress = useSelector(
    (state: RootState) => state.currentData.currentTestInProgress
  );

  const { modalVisible, setModalVisible, pendingPath, checkTest } = useCheckTest(currentTestInProgress);
  const handleCloseTest = useCloseTest(setModalVisible, pendingPath);

  return (
    <div
      style={{
        backgroundColor: headerColors,
        borderRight: `1px solid ${hoverColor}`,
      }}
      className={styles.wrap}
    >
      <div style={{ color: textColor }} className={styles.title}>
        <h3>Theory Test</h3>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            onClick={(e) => checkTest(path, e)}
            className={isActivePath(path, location.pathname) ? styles["nav-btn"] : styles["not-active"]}
            to={path}
            style={{
              "--header-bg-color": headerColors,
              "--text-color": textColor,
              "--hover-bg-color": hoverColor,
              "--header-svg-color": headerSvgColor,
            } as React.CSSProperties}
          >
            <Icon />
            <span className={styles.label}>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.containerColor}>
        <SwitchColor svgColor={headerSvgColor} />
      </div>

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
}
