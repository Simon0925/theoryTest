import { useEffect, useState } from 'react';
import Main from './layout/Main/Main';
import styles from './App.module.scss';
import Header from './layout/Header/Header';
import BurgerMenu from './layout/BurgerMenu/BurgerMenu';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';

function App() {
  const menu = useSelector((state: RootState) => state.menu.open);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(()=>{
    setMenuOpen(menu)
  },[menu])

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
