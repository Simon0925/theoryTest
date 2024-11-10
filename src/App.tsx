import { useEffect, useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import tokenVerification from './service/tokenVerification/tokenVerification';
import { login } from './store/auth/auth';
import Modal from './components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { resetStateAll } from './store/currentData/currentData.slice';
import styles from './App.module.scss';



const Main = lazy(() => import('./layout/Main/Main'));
const BurgerMenu = lazy(() => import('./layout/BurgerMenu/BurgerMenu'));
const Header = lazy(() => import('./layout/Header/Header'));

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


  const menuClassName = useMemo(() => {
    return `${styles.wrap} ${isMenuOpen ? styles.menuOpen : ''}`;
  }, [isMenuOpen]);

  return (
    <div className={menuClassName}>
      <div className={styles.burgerMenu}>
        <Suspense>
          <BurgerMenu />
        </Suspense>
      </div>
      <div className={styles.mainContent}>
        <Suspense >
          <Header setNextPath={setPendingPath} setModal={setModalVisible} />
        </Suspense>
        <Suspense >
          <Main />
        </Suspense>
      </div>

      {modalVisible && (
        <Modal
          title="Are you sure you want to exit from the test?"
          cancel
          cancelClick={() => setModalVisible(false)}
          close={handleCloseTest}
          blueBtnText="Exit Test"
          text={''}
        />
      )}
    </div>
  );
}

export default App;
