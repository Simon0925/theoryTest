import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from './layout/Main/Main';
import Header from './layout/Header/Header';
import BurgerMenu from './layout/BurgerMenu/BurgerMenu';
import styles from './App.module.scss';
import { RootState } from './store/store';
import tokenVerification from './service/tokenVerification/tokenVerification';
import { login } from './store/auth/auth';

export interface TokenVerificationStatus {
  areEqual: boolean;
  id: string;
  userName: string;
}

function App() {
  const dispatch = useDispatch();

  const menu = useSelector((state: RootState) => state.menu.open);
  const [menuOpen, setMenuOpen] = useState(menu);

  useEffect(() => {
    const localS = localStorage.getItem('accessToken');

    const checkLoginStatus = async () => {

      const status = (await tokenVerification(dispatch)) as TokenVerificationStatus | boolean;
    
      if (status && typeof status !== 'boolean') {
        dispatch(login({ login: status.areEqual, id: status.id, userName: status.userName }));
      } else {
        dispatch(login({ login: false, id: "", userName: "" }));
      }
    };

    if (localS) {
      checkLoginStatus();
    }
  }, []); 

  useEffect(() => {
    setMenuOpen(menu);
  }, [menu]); 

  return (
    <div className={`${styles.wrap} ${menuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.burgerMenu}>
        <BurgerMenu />
      </div>
      <div className={styles.mainContent}>
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
