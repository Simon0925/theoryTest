import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import styles from "./BurgerMenu.module.scss";
import SwitchColor from "../../components/SwitchColor/SwitchColor";
import Modal from "../../components/Modal/Modal";
import { resetStateAll, setTestInactive } from "../../store/currentData/currentData.slice";
import { updateBurgerMenu } from "../../store/burgerMenu/burgerMenu.slice";
import { RootState } from "../../store/store";

import { NAV_ITEMS, isActivePath } from "./service/pathKey";

export default function BurgerMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  const modalRoot = document.getElementById("modal-root");

  const { headerColors, textColor, hoverColor, headerSvgColor } = useSelector(
    (state: RootState) => state.color.themeData
  );

  const currentTestInProgress = useSelector(
    (state: RootState) => state.currentData.currentTestInProgress
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [pendingPath, setPendingPath] = useState("");

  const handleCloseTest = () => {
    setModalVisible(false);
    dispatch(resetStateAll());
    dispatch(setTestInactive(false));
    navigate(pendingPath);
    dispatch(updateBurgerMenu(false));
  };

  const checkTest = (path: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (currentTestInProgress) {
      event.preventDefault();
      setPendingPath(path);
      setModalVisible(true);
    } else {
      navigate(path);
      dispatch(updateBurgerMenu(false));
    }
  };

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
