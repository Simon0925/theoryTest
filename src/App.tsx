import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from './layout/Main/Main';
import Header from './layout/Header/Header';
import BurgerMenu from './layout/BurgerMenu/BurgerMenu';
import styles from './App.module.scss';
import { RootState } from './store/store';
import tokenVerification from './service/tokenVerification/tokenVerification';
import { login } from './store/auth/auth';
import Modal from './components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { resetStateAll } from './store/currentData/currentData.slice';

export interface TokenVerificationStatus {
  areEqual: boolean;
  id: string;
  userName: string;
}

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMenuOpen = useSelector((state: RootState) => state.menu.open);
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingPath, setPendingPath] = useState("");

  
  const verifyTokenAndLogin = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const status = (await tokenVerification(dispatch)) as TokenVerificationStatus | boolean;
      if (status && typeof status !== 'boolean') {
        dispatch(login({ login: status.areEqual, id: status.id, userName: status.userName }));
      } else {
        dispatch(login({ login: false, id: "", userName: "" }));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    verifyTokenAndLogin();
  }, [verifyTokenAndLogin]);


  const handleCloseTest = useCallback(() => {
    setModalVisible(false);
    if (pendingPath) {
      dispatch(resetStateAll());
      navigate(pendingPath);
    }
  }, [pendingPath, navigate, dispatch]);

  return (
    <div className={`${styles.wrap} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.burgerMenu}>
        <BurgerMenu />
      </div>
      <div className={styles.mainContent}>
      <Header setNextPath={setPendingPath} setModal={setModalVisible} />
        <Main />
      </div>

      {modalVisible && (
        <Modal
          title="Are you sure you want to exit from the test?"
          cancel
          cancelClick={() => setModalVisible(false)}
          close={handleCloseTest}
          blueBtnText="Exit Test" text={''}        />
      )}
    </div>
  );
}

export default App;
