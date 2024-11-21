import { useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import tokenVerification from './services/tokenVerification/tokenVerification';
import { login } from './store/auth/auth';
import styles from './App.module.scss';
import useCookie from './hooks/useCookie';


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
  const accessToken = useCookie('accessToken');
  
  const isMenuOpen = useSelector((state: RootState) => state.menu.open);

  const { headerColors} = useSelector(
    (state: RootState) => state.color
  );
  
  const verifyTokenAndLogin = useCallback(async () => {
    if (accessToken) {
      const status = (await tokenVerification(dispatch,accessToken)) as TokenVerificationStatus | boolean;
      if (status && typeof status !== 'boolean') {
        dispatch(login({ login: status.areEqual, id: status.id, userName: status.userName }));
      } else {
        dispatch(login({ login: false, id: "", userName: "" }));
      }
    }
  }, [dispatch,accessToken]);


  useEffect(() => {
    if (accessToken) {
          verifyTokenAndLogin();
    }
  }, [verifyTokenAndLogin, accessToken]);


  const menuClassName = useMemo(() => {
    return `${styles.wrap} ${isMenuOpen ? styles.menuOpen : ''}`;
  }, [isMenuOpen]);

  return (
    <div className={menuClassName}>
      <div style={{ backgroundColor: headerColors}} className={styles.burgerMenu}>
        <Suspense>
          <BurgerMenu />
        </Suspense>
      </div>
      <div className={styles.mainContent}>
        <Suspense >
          <Header />
        </Suspense>
        <Suspense >
          <Main />
        </Suspense>
      </div>
      <div id="modal-root"></div>
    </div>
  );
}

export default App;
